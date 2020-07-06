import * as React from "react";
import state from "./state";
import { connect } from "lape";

const actionDeep = () => {
  state.deep.nest = !state.deep.nest;
};
const NestedObject = () => (
  <div style={{ margin: 20 }} onClick={actionDeep}>
    Nested object: {state.deep.nest.toString()}
  </div>
);

export default connect(NestedObject);
