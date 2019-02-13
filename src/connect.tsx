import * as React from "react";
import Emitter, {BatchCallback, Callback, Data} from "./eventEmitter";

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
  class Connect extends React.PureComponent {
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
        if (prop === undefined) {
          this.trackAll.add(target);
          return;
        }
        const trackedObject = this.trackProp.get(target);

        // track prop from target
        if (trackedObject) {
          if (trackedObject.includes(prop)) {
            return;
          }
          trackedObject.push(prop);
          return;
        }
        this.trackProp.set(target, [prop]);
      }
    };
    trackSet: BatchCallback = (data: Map<object, Data>) => {
      if (this.sideEffectPhase) {
        throw new Error(
          "SET cannot be called while resolving a side effect as it might trigger an infinite loop"
        );
      }

      data.forEach(({props}, target) => {
        const trackedObject = this.trackProp.get(target);
        const trackedFull = this.trackAll.has(target);
        if (trackedFull || (trackedObject && trackedObject.some((tracked) => props.includes(tracked)))) {
          this.forceUpdate();
        }
      })
    };

    stopTracking = () => {
      Emitter.removeGet(this.trackGet);
      this.sideEffectPhase = false;
    };

    componentWillUnmount() {
      Emitter.removeSet(this.trackSet);
    }

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
