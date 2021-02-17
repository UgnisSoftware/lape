import React, { useMemo } from "react";
import { proxify, trackAll } from "../proxify";
import ConnectManager from "../connect/ConnectManager";
import Emitter from "../Emitter";

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

    const trackingObj = useMemo(() => ({}), []);
    Emitter.triggerGetListeners(trackingObj, trackAll);

    const updateStateWrapped: typeof updateState = (newState) => {
      Emitter.triggerSetListeners(trackingObj, 'any', 'any')

      return updateState(newState);
    };

    return [state, updateStateWrapped];
  };
};
