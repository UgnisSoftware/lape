import React, { useMemo } from "react";
import { proxify } from "../proxify";
import ConnectManager from "../connect/ConnectManager";
import { lape } from "lape/index";

export const useLape = <T extends {}>(initialState: T): T => {
  const state = useMemo(() => initialState, []);

  return proxify(state);
};

export const useEffectLape = (callback) => {
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
    const lapeWatcher = useMemo(() => lape({ count: 0 }), []);

    lapeWatcher.count;
    const updateStateWrapped: typeof updateState = (newState) => {
      lapeWatcher.count++;
      return updateState(newState);
    };

    return [state, updateStateWrapped];
  };
};
