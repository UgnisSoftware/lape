import React from "react";
import ConnectManager from "./ConnectManager";

interface StopTrackingProps {
  stopTracking: () => void;
}

const StopTracking = ({ stopTracking }: StopTrackingProps) => {
  stopTracking();
  return null;
};

export const connect = <T extends {}>(Component: React.ComponentType<T>): React.ComponentType<T> => {
  class Connect extends React.Component<T> {
    timeout = null;
    componentRender = () => {
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.forceUpdate();
          this.timeout = null;
        }, 0);
      }
    };

    componentWillUnmount = () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      ConnectManager.removeTracking(this.componentRender);
    };

    render() {
      ConnectManager.startTracking(this.componentRender);
      return (
        <>
          <Component {...this.props} />
          <StopTracking stopTracking={() => ConnectManager.stopTracking()} />
        </>
      );
    }
  }

  return Connect;
};
