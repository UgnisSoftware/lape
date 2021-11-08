import React, { Attributes, ComponentClass, FunctionComponent, ReactElement, ReactNode } from "react";
export { Fragment } from "react";
import { connect } from "../";

const allReactComponents = new WeakMap<
  FunctionComponent<any> | ComponentClass<any>,
  FunctionComponent<any> | ComponentClass<any>
>();

export const jsx = <P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null,
  key?: string
): ReactElement<P> => {
  const newProps = key !== undefined ? { ...props, key } : props;
  if (typeof type !== "function") {
    return React.createElement(type, newProps);
  }
  if (allReactComponents.has(type)) {
    return React.createElement(allReactComponents.get(type), newProps);
  }
  const newComponent = connect(type);
  allReactComponents.set(type, newComponent);
  return React.createElement(newComponent, newProps);
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
