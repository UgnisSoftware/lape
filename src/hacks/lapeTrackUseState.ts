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
