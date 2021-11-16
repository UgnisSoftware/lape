import React, { useMemo } from "react";
import ConnectManager from "../connect/ConnectManager";

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
            const [state, updateState] = originalUseState(initialState);
            const currentRender = ConnectManager.getCurrentListener();
            const updateStateWrapped = useMemo(
              () => (newState: any) => {
                const a = updateState(newState);
                if (currentRender && !ConnectManager.getCurrentListener()) {
                  currentRender();
                }
                return a;
              },
              []
            );

            return [state, updateStateWrapped];
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
