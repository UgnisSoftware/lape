import React, { useMemo } from "react";
import ConnectManager from "../connect/ConnectManager";
import { useLape } from "../hook/hook";
import { ignoreState } from "lape/proxify";

export const lapeTrackUseState = () => {
  const originalUseState = React.useState;

  // @ts-ignore
  React.useState = <S>(initialState: S): ReturnType<typeof originalUseState> => {
    const [state, updateState] = originalUseState(initialState);

    const currentRender = useMemo(() => ConnectManager.getCurrentListener(), []);
    const updateStateWrapped: typeof updateState = useMemo(
      () => (newState) => {
        if (currentRender && !ConnectManager.getCurrentListener()) {
          ConnectManager.continueTracking(currentRender);
          setTimeout(() => ConnectManager.stopTracking(), 0);
        }
        return updateState(newState);
      },
      []
    );

    return [state, updateStateWrapped];
  };
};

export const lapeSyncInternalUseState = () => {
  (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.internalCurrent = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.current;
  Object.defineProperty(
    (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher,
    "current",
    {
      get() {
        const originalUseState = this.internalCurrent.useState;
        return {
          ...this.internalCurrent,
          useState: <S extends any>(initialState: S): ReturnType<typeof originalUseState> => {
            const initState = useMemo(() => (typeof initialState === "function" ? initialState() : initialState), []);
            const state = useLape({ reference: ignoreState(initState) });
            const updateState = useMemo(
              () => (update) => {
                if (typeof update === "function") {
                  state.reference = ignoreState(update(state.reference));
                } else {
                  state.reference = ignoreState(update);
                }
              },
              []
            );
            return [state.reference, updateState];
          },
        };
      },
      set(newValue) {
        this.internalCurrent = newValue;
      },
      enumerable: true,
      configurable: true,
    }
  );
};
