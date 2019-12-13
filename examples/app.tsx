import * as React from "react";
import * as ReactDom from "react-dom";
import { connect } from "@lape";
import state from "./state";

const action1 = () => {
  state.count += 1;
};
const One = connect(() => (
  <div style={{ margin: 20 }} onClick={action1}>
    {console.log("1 deep")}
    {state.array.map((data, i) => (
      <span key={i}>{data.amount} </span>
    ))}
    {state.deep.nest.toString()}
  </div>
));

const action2 = () => {
  state.count += 1;
};
const Two = connect(
  () =>
    console.log("asdasdasdasd") ||
    (state.array.length % 2 ? (
      <div style={{ margin: 20 }} onClick={action2}>
        {console.log("2 count")}
        {state.count}
      </div>
    ) : null)
);

const action3 = () => {
  // state.array.unshift({ amount: 123 });
  state.array.push({ amount: 123 });
};
const Three = connect(() => (
  <div style={{ margin: 20 }}>
    {console.log("3 ARRAY")}
    {state.array.map((data, i) => (
      <div key={i}>
        <div onClick={action3}>{data.amount}</div>
        <span
          onClick={() => {
            state.array.splice(i, 1);
          }}
        >
          x
        </span>
      </div>
    ))}
  </div>
));

class App extends React.Component {
  render() {
    return (
      <div>
        <One />
        <Two />
        <Three />
      </div>
    );
  }
}

const WrappedApp = connect(App);

ReactDom.render(<WrappedApp />, document.getElementById("editor"));
