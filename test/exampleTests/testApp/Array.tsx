import * as React from "react";
import state from "./state";
import { connect } from "lape";

const actionIncrement = (i) => () => {
  state.array[i].amount += 100;
};
const actionAdd = () => {
  state.array.push({ amount: 123 });
};
const actionRemove = (i) => () => {
  state.array.splice(i, 1);
};

const Array = connect(() => (
  <div style={{ margin: 20 }}>
    {state.array.map((data, i) => (
      <div key={i}>
        Array {i}: {data.amount}
        <button onClick={actionIncrement(i)} type="button">
          increment {i}
        </button>
        <button onClick={actionRemove(i)} type="button">
          remove {i}
        </button>
      </div>
    ))}
    <button onClick={actionAdd} type="button">
      add
    </button>
  </div>
));

export default connect(Array);
