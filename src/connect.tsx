import React from "react";
import Emitter from "./eventEmitter";

interface StopTrackingProps {
  stopTracking: () => void;
}

const StopTracking = ({ stopTracking }: StopTrackingProps) => {
  stopTracking();
  return null;
};

export const connect = (
  Component: React.ComponentType
): React.ComponentType => {
  class Connect extends React.Component {
    componentRender = this.forceUpdate.bind(this);
    startTracking = () => {
      Emitter.removeCache(this.componentRender);
      Emitter.recordingQueue.push(this.componentRender);
    };
    stopTracking = () => {
      Emitter.recordingQueue.pop();
    };

    render() {
      this.startTracking();
      return (
        <>
          <Component {...this.props} />
          <StopTracking stopTracking={this.stopTracking} />
        </>
      );
    }
  }

  return Connect;
};
