import { isValidElement } from "react";
import Emitter from "./Emitter";

export const trackAll = Symbol("all");
export const deletedValue = Symbol("deleted");
const allProxies = new WeakSet();
const ignoredValues = new WeakSet();

export const ignoreState = <T extends object>(value: T) => {
  ignoredValues.add(value);
  return value;
};

const valueIsObject = (value: any) =>
  typeof value === "object" &&
  value !== null &&
  !(value instanceof Date) &&
  !(value instanceof Blob) &&
  !(value instanceof Map) &&
  !(value instanceof WeakMap) &&
  !(value instanceof Set) &&
  !(value instanceof WeakSet) &&
  !isValidElement(value) &&
  !ignoredValues.has(value);

const handler = {
  get: (target, prop) => {
    const type = typeof target;
    if (type === "string" || type === "number" || type === "boolean") {
      return Reflect.get(target, prop);
    }

    const isArrayMethod = Array.isArray(target) && (typeof prop === "symbol" || isNaN(prop));

    if (isArrayMethod) {
      Emitter.triggerGetListeners(target, trackAll);
      return Reflect.get(target, prop);
    }
    if (valueIsObject(target)) {
      Emitter.triggerGetListeners(target, prop);
      return Reflect.get(target, prop);
    }
    return Reflect.get(target, prop);
  },
  ownKeys: (target) => {
    Emitter.triggerGetListeners(target, trackAll);
    return Reflect.ownKeys(target);
  },

  set: (target, prop, value) => {
    if (valueIsObject(value)) {
      value = proxify(value);
    }
    const trigereableProp = !((Array.isArray(target) && prop === "length") || value === target[prop]);
    if (trigereableProp) {
      Emitter.triggerPreSetListeners(target, prop, value);
    }
    Reflect.set(target, prop, value);
    if (trigereableProp) {
      Emitter.triggerSetListeners(target, prop, value);
    }
    return true;
  },
  deleteProperty: (target, prop) => {
    Emitter.triggerPreSetListeners(target, prop, deletedValue);
    Reflect.deleteProperty(target, prop);
    Emitter.triggerSetListeners(target, prop, deletedValue);
    return true;
  },
};

export const proxify = <T extends object>(state: T): T => {
  if (allProxies.has(state)) {
    return state;
  }
  for (let [key, value] of Object.entries(state)) {
    if (valueIsObject(value)) {
      state[key] = proxify(value);
    }
  }
  const wrapper = new Proxy(state, handler);
  allProxies.add(wrapper);
  return wrapper;
};
