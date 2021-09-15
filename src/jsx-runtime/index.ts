import React, { Attributes, ComponentClass, FunctionComponent, ReactElement, ReactNode } from "react";
import { connect } from "../";

const allReactComponents = new WeakMap<
  FunctionComponent<any> | ComponentClass<any>,
  FunctionComponent<any> | ComponentClass<any>
>();

export const jsx = <P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null
): ReactElement<P> => {
  if (typeof type === "string") {
    return React.createElement(type, props);
  }
  if (allReactComponents.has(type)) {
    return React.createElement(allReactComponents.get(type), props);
  }
  const newComponent = connect(type);
  allReactComponents.set(type, newComponent);
  return React.createElement(newComponent, props);
};

export const jsxOld = <P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null,
  children?: ReactNode[]
): ReactElement<P> => {
  if (children) {
    return jsx(type, { ...props, children });
  }
  return jsx(type, props);
};

export { jsx as jsxs };
