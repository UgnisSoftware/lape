import React, { useMemo } from "react";
import { proxify } from "../proxify";
import ConnectManager from "../connect/ConnectManager";

export const useLape = <T extends {}>(initialState: T): T => {
  const state = useMemo(() => initialState, []);

  return proxify(state);
};

export const useLapeEffect = (callback) => {
  useMemo(() => {
    const newCallback = () => {
      ConnectManager.startTracking(newCallback);
      callback();
      ConnectManager.stopTracking();
    };
    newCallback();
  }, []);
};

export const lapeTrackUseState = () => {
  const originalUseState = React.useState;

  // @ts-ignore
  React.useState = <S>(initialState: S): ReturnType<typeof originalUseState> => {
    const [state, updateState] = originalUseState(initialState);

    const currentRender = useMemo(() => ConnectManager.getCurrentListener(), []);
    const updateStateWrapped: typeof updateState = (newState) => {
      if (currentRender && !ConnectManager.getCurrentListener()) {
        ConnectManager.continueTracking(currentRender);
        setTimeout(() => ConnectManager.removeTracking(currentRender), 0);
      }
      return updateState(newState);
    };

    return [state, updateStateWrapped];
  };
};
