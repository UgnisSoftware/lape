import React from "react";
import ConnectManager from "./ConnectManager";

interface StopTrackingProps {
  stopTracking: () => void;
}

const StopTracking = ({ stopTracking }: StopTrackingProps) => {
  stopTracking();
  return null;
};

export const connect = (Component: React.ComponentType): React.ComponentType => {
  class Connect extends React.Component {
    componentRender = () => this.setState({});

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
