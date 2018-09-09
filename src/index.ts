import Emitter from "./eventEmitter";

const handler = {
  get: (target, prop) => {
    Emitter.triggerGet(target, prop);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    Emitter.triggerSet(target, prop);
    Reflect.set(target, prop, value);
    return true;
  }
};

export const proxify = <T>(state: T): T => {

  const state1 = Object.keys(state).reduce((acc, key) => {
    acc[key] =
      typeof state[key] === "object"
        ? proxify(state[key])
        : state[key];
    return acc;
  }, {});

  return new Proxy(state1, handler);
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
