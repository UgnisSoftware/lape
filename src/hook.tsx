import { useMemo, useRef, useState } from "react";
const allProxies = new WeakSet();

export const useLape = <T extends {}>(initialState: T): T => {
  const [count, forceUpdate] = useState(0);
  const state = useMemo(() => initialState, []);
  const timeoutRef = useRef(null);

  if (allProxies.has(state)) {
    return state;
  }

  const handler = {
    set: (target, prop, value) => {
      const valueIsObject = typeof value === "object" && value !== null;
      if (valueIsObject) {
        value = proxify(value);
      }
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null
          forceUpdate(count + 1);
        }, 0);
      }
      return Reflect.set(target, prop, value);
    },
    deleteProperty: (target, prop) => {
      Reflect.deleteProperty(target, prop);
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null
          forceUpdate(count + 1);
        }, 0);
      }
      return true;
    },
  };

  const proxify = <T extends object>(state: T): T => {
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

  return proxify(state);
};
