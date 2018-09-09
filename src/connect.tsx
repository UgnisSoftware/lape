import * as React from "react";
import Emitter, { Callback } from "./eventEmitter";

export const connect = (Component: React.ComponentType) => {
  class Provider extends React.Component {
    constructor(props) {
      super(props);
      Emitter.addSet(this.trackSet);
    }

    sideEffectPhase: boolean;

    tracker: WeakMap<object, string[]> = new WeakMap();

    startTracking = () => {
      Emitter.addGet(this.trackGet);
      this.sideEffectPhase = true;
      this.tracker = new WeakMap();
    };

    trackObj = (target, prop) => {
      const trackedObject = this.tracker.get(target);

      if (trackedObject) {
        trackedObject.push(prop);
        return;
      }
      this.tracker.set(target, [prop]);
    };

    trackGet: Callback = (target, prop) => {
      if (this.sideEffectPhase) {
        this.trackObj(target, prop);
      }
    };
    trackSet: Callback = (target, prop) => {
      if (this.sideEffectPhase) {
        throw new Error(
          "SET cannot be called while resolving a side effect as it might trigger an infinite loop"
        );
      }
      const trackedObject = this.tracker.get(target);
      if (trackedObject && trackedObject.includes(prop)) {
        this.forceUpdate();
      }
    };

    stopTracking = () => {
      Emitter.removeGet(this.trackGet);
      this.sideEffectPhase = false;
    };

    componentDidMount() {
      this.stopTracking();
    }

    componentDidUpdate() {
      this.stopTracking();
    }

    componentWillUnmount() {
      Emitter.removeGet(this.trackGet);
      Emitter.removeSet(this.trackSet);
    }

    render() {
      this.startTracking();
      return <Component {...this.props} />;
    }
  }

  return Provider;
};
