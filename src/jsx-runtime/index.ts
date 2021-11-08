import React, { Attributes, ComponentClass, FunctionComponent, ReactElement, ReactNode } from "react";
export { Fragment } from "react";
import runtime from "react/jsx-runtime";
import { connect } from "../";

const allReactComponents = new WeakMap<
  FunctionComponent<any> | ComponentClass<any>,
  FunctionComponent<any> | ComponentClass<any>
>();

export const jsx = <P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  ...rest
): ReactElement<P> => {
  if (typeof type !== "function") {
    return (runtime as any).jsx(type, ...rest);
  }
  if (allReactComponents.has(type)) {
    return (runtime as any).jsx(allReactComponents.get(type), ...rest);
  }
  const newComponent = connect(type);
  allReactComponents.set(type, newComponent);
  return (runtime as any).jsx(newComponent, ...rest);
};

export const jsxOld = <P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null,
  ...children: ReactNode[]
): ReactElement<P> => {
  if (typeof type !== "function") {
    return React.createElement(type, props, ...children);
  }
  if (allReactComponents.has(type)) {
    return React.createElement(allReactComponents.get(type), props, ...children);
  }
  const newComponent = connect(type);
  allReactComponents.set(type, newComponent);
  return React.createElement(newComponent, props, ...children);
};

export { jsx as jsxs };
export { jsxOld as createElement };
