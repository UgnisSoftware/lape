import React, { Attributes, ComponentClass, FunctionComponent, ReactElement } from "react";
import { connect } from "lape";

const allReactComponents = new WeakMap<
  FunctionComponent<any> | ComponentClass<any>,
  FunctionComponent<any> | ComponentClass<any>
>();

export const jsx = <P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null,
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

export { jsx as jsxs };
