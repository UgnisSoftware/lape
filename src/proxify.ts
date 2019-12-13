import Emitter from "./eventEmitter";

export const trackAll = Symbol("all");
const allProxies = new WeakSet();

const handler = {
  get: (target, prop) => {
    const isArrayMethod =
      Array.isArray(target) && (typeof prop === "symbol" || isNaN(prop));

    if (isArrayMethod) {
      Emitter.mapStateToComponents(target, trackAll);
      return Reflect.get(target, prop);
    }
    Emitter.mapStateToComponents(target, prop);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    const valueIsObject = typeof value === "object" && value !== null;

    if (valueIsObject) {
      value = proxify(value);
    }

    Emitter.renderComponents(target, prop);
    return Reflect.set(target, prop, value);
  },
  ownKeys: target => {
    if (Emitter.recordingQueue.length) {
      Emitter.mapStateToComponents(target, trackAll);
    }
    return Reflect.ownKeys(target);
  },
  deleteProperty: (target, prop) => {
    Emitter.deleteProperty(target, prop);
    Reflect.deleteProperty(target, prop);
    return true;
  }
};

export const proxify = <T extends object>(state: T): T => {
  if (allProxies.has(state)) {
    return state;
  }
  for (let [key, value] of Object.entries(state)) {
    if (typeof value === "object" && value !== null) {
      state[key] = proxify(value);
    }
  }
  const wrapper = new Proxy(state, handler);
  allProxies.add(wrapper);
  return wrapper;
};
