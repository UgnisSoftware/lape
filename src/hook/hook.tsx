import { useMemo } from "react";
import { proxify } from "../proxify";
import ConnectManager from "../connect/ConnectManager";

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
