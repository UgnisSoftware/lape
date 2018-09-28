import Emitter from "./eventEmitter";

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
        Array.isArray(target) && (typeof prop === "symbol" || !isNaN(prop));
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

/*
    Wrap state in proxy


    when rendering a component

      before render set listeners to component
      every get is registered to that component
      every set throws (same as using setState in render)
      after render, return listener to parent


   State set outside of render
      wait for all



  array and object access should work same as with elvis notation


  {
    count: 0
  }

  // in side effect stage

  if used without context - warn that the value will not be tracked
  if context exists:
    every state.count would add a listener
    every state.count = 1 would throw error - can't update value as it would trigger a

  // in event phase

    every state.count would return a value and do nothing
    every state.count = 1 would change the value immediately and mark value to be reconciled in next cycle

  // cycle

  all

 */
