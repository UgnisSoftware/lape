import * as React from "react";
import state from "./state";
import { connect } from "lape";

const DateComponent = connect(() => {
  const onClick = () => {
    state.date = new Date("2020-07-02");
  };

  return (
    <div style={{ margin: 20 }}>
      <button onClick={onClick} type="button">
        Date: {state.date.toISOString()}
      </button>
    </div>
  );
});

export default connect(DateComponent);
