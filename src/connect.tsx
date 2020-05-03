import React from "react";
import Emitter from "./eventEmitter";

interface HackProps {
  bestHackEver: () => void;
}

const StopTracking = ({ bestHackEver }: HackProps) => {
  bestHackEver();
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
          <StopTracking bestHackEver={this.stopTracking} />
        </>
      );
    }
  }

  return Connect;
};
