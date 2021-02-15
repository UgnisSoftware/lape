import * as React from "react";
import state from "./state";
import { connect } from "lape";
import { useState } from "react";

const actionSimple = () => {
  state.count += 1;
};
const MixingUseState = () => {
  const [loading, setLoading] = useState(true);

  if (loading) return <button onClick={() => setLoading(false)}>Loading</button>;

  return (
    <div style={{ margin: 20 }} onClick={actionSimple}>
      Simple counter: {state.count}
    </div>
  );
};

export default connect(MixingUseState);
