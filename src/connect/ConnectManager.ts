import Emitter, { GetCallback, SetCallback } from "../Emitter";
import { trackAll } from "../proxify";

type ForceRender = () => void;

// will remain empty and is only used for reference checking
const trackAllSet = new Set<string | Symbol>();

class ConnectManager {
  stateDependencies = new Map<ForceRender, Map<object, Set<string | Symbol>>>();
  forceRenders = [];

  constructor() {
    Emitter.listenGetEvents(this.onGet);
    Emitter.listenSetEvents(this.onSet);
  }

  getCurrentListener = () => {
    if (this.forceRenders.length) {
      return this.forceRenders[this.forceRenders.length - 1];
    }
  };

  startTracking = (forceRender: ForceRender) => {
    this.forceRenders.push(forceRender);
    this.stateDependencies.set(forceRender, new Map());
  };

  continueTracking = (forceRender: ForceRender) => {
    this.forceRenders.push(forceRender);
  };

  stopTracking = () => {
    this.forceRenders.pop();
  };

  removeTracking = (forceRender: ForceRender) => {
    this.stateDependencies.delete(forceRender);
  };

  onGet: GetCallback = (target, prop) => {
    if (!this.forceRenders.length) {
      return;
    }
    const forceRender = this.forceRenders[this.forceRenders.length - 1];

    if (!this.stateDependencies.has(forceRender)) {
      this.stateDependencies.set(forceRender, new Map());
    }

    const targetCallbacks = this.stateDependencies.get(forceRender).get(target);

    if (targetCallbacks === trackAllSet) {
      return;
    }

    if (prop === trackAll) {
      this.stateDependencies.get(forceRender).set(target, trackAllSet);
      return;
    }

    if (!targetCallbacks) {
      this.stateDependencies.get(forceRender).set(target, new Set([prop]));
    } else {
      targetCallbacks.add(prop);
    }
  };
  onSet: SetCallback = (target, prop) => {
    this.stateDependencies.forEach((targets, forceRender) => {
      const trg = targets.get(target);
      if (trg && (trg === trackAllSet || trg.has(prop))) {
        forceRender();
      }
    });
  };

  reset = () => {
    this.stateDependencies = new Map();
    this.forceRenders = [];
    // in case Emitter was not reset
    Emitter.removeGetListener(this.onGet);
    Emitter.removeSetListener(this.onSet);

    Emitter.listenGetEvents(this.onGet);
    Emitter.listenSetEvents(this.onSet);
  };
}

export default new ConnectManager();
