import Emitter from "./eventEmitter";

const allProxies = new WeakSet();
const allProxiesMap = new WeakMap();

const handler = {
  get: (target, prop) => {
    // nobody is listening
    if (Emitter.listenersGet.length === 0) {
      return Reflect.get(target, prop);
    }

    const type = typeof target;
    if (type === "object" && target !== null) {
      const isArrayMethod =
        Array.isArray(target) && (typeof prop === "symbol" || isNaN(prop));
      if (isArrayMethod) {
        Emitter.triggerGet(target);
        return Reflect.get(target, prop);
      }
      Emitter.triggerGet(target, prop);
      return Reflect.get(target, prop);
    }
    if (type === "string" || type === "number" || type === "boolean") {
      return Reflect.get(target, prop);
    }
  },
  ownKeys: target => {
    if (Emitter.listenersGet.length === 0) {
      return Reflect.ownKeys(target);
    }
    Emitter.triggerGet(target);
    return Reflect.ownKeys(target);
  },
  set: (target, prop, value, receiver) => {
    if (typeof value === "object" && value !== null && !allProxies.has(value)) {
      value = proxify(value);
    }
    const previous = Array.isArray(target) ? target.slice() : { ...target };
    Reflect.set(target, prop, value);
    const next = Array.isArray(target) ? target.slice() : { ...target };
    Emitter.triggerSet(target, prop, receiver, previous, next);
    return true;
  },
  deleteProperty(target, prop) {
    const previous = Array.isArray(target) ? target.slice() : { ...target };
    Reflect.deleteProperty(target, prop);
    const next = Array.isArray(target) ? target.slice() : { ...target };
    Emitter.triggerSet(target, prop, allProxiesMap.get(target), previous, next);
    return true;
  }
};

export const proxify = <T extends object>(state: T): T => {
  Object.keys(state).forEach(key => {
    if (allProxies.has(state)) {
      return;
    }
    if (typeof state[key] === "object" && state[key] !== null) {
      state[key] = proxify(state[key]);
    }
  });
  if (allProxies.has(state)) {
    return state;
  }
  const wrapper = new Proxy(state, handler);
  allProxies.add(wrapper);
  allProxiesMap.set(state, wrapper);
  return wrapper;
};
