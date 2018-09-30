import Emitter from "./eventEmitter";
export { connect } from "./connect";

const allProxies = new WeakSet();

const handler = {
  get: (target, prop) => {
    // nobody is listening
    if (Emitter.listenersGet.length === 0) {
      return Reflect.get(target, prop);
    }

    const type = typeof target;
    if (type === "object") {
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
  set: (target, prop, value) => {
    if (typeof value === "object" && !allProxies.has(value)) {
      value = proxify(value);
    }
    Reflect.set(target, prop, value);
    Emitter.triggerSet(target, prop);
    return true;
  }
};

export const proxify = <T extends object>(state: T): T => {
  Object.keys(state).forEach(key => {
    if (allProxies.has(state)) {
      return;
    }
    if (typeof state[key] === "object") {
      state[key] = proxify(state[key]);
    }
  });
  if (allProxies.has(state)) {
    return state;
  }
  const wrapper = new Proxy(state, handler);
  allProxies.add(wrapper);
  return wrapper;
};

