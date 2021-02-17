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
    const lapeWatcher = useMemo(() => proxify({ count: 0 }), []);

    lapeWatcher.count;
    const updateStateWrapped: typeof updateState = (newState) => {
      lapeWatcher.count++;
      return updateState(newState);
    };

    return [state, updateStateWrapped];
  };
};
