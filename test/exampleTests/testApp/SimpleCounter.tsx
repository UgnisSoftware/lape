import * as React from "react";
import state from "./state";
import { connect } from "lape";

const actionSimple = () => {
  state.count += 1;
};
const SimpleCount = () => (
  <div style={{ margin: 20 }} onClick={actionSimple}>
    Simple counter: {state.count}
  </div>
);

export default connect(SimpleCount);
