import * as React from "react";
import Emitter, { Callback } from "./eventEmitter";

const a = {};
export const connect = (Component: React.ComponentType) => {
  class Provider extends React.Component {
    constructor(props) {
      super(props);
      Emitter.addSet(this.trackSet);
    }

    sideEffectPhase: boolean;

    trackProp: WeakMap<object, string[]> = new WeakMap();
    trackAll: WeakSet<object> = new WeakSet();

    startTracking = () => {
      Emitter.addGet(this.trackGet);
      this.sideEffectPhase = true;
      this.trackProp = new WeakMap();
    };

    trackGet: Callback = (target, prop) => {
      if (this.sideEffectPhase) {
        if (!prop) {
          this.trackAll.add(target);
          return;
        }
        const trackedObject = this.trackProp.get(target);

        if (trackedObject && !trackedObject.includes(prop)) {
          trackedObject.push(prop);
          return;
        }
        this.trackProp.set(target, [prop]);
      }
    };
    trackSet: Callback = (target, prop) => {
      if (this.sideEffectPhase) {
        throw new Error(
          "SET cannot be called while resolving a side effect as it might trigger an infinite loop"
        );
      }
      const trackedObject = this.trackProp.get(target);
      const trackedFull = this.trackAll.has(target);
      if (trackedFull || (trackedObject && trackedObject.includes(prop))) {
        this.setState(a);
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
