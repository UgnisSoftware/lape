import React, { useEffect, useReducer } from "react";
import ConnectManager from "./ConnectManager";

interface StopTrackingProps {
  stopTracking: () => void;
}

const StopTracking = ({ stopTracking }: StopTrackingProps) => {
  stopTracking();
  return null;
};

export const connect = <T extends {}>(Component: React.ComponentType<T>): React.ComponentType<T> => {
  return (props) => {
    const [, forceRender] = useReducer((s) => s + 1, 0);

    useEffect(() => {
      return () => {
        ConnectManager.removeTracking(forceRender);
      };
    }, []);

    ConnectManager.startTracking(forceRender);
    return (
      <>
        <Component {...props} />
        <StopTracking stopTracking={() => ConnectManager.stopTracking()} />
      </>
    );
  };
};
