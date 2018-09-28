import * as React from "react";
import * as ReactDom from "react-dom";
import { connect } from "./connect";
import state from "@state";

const action1 = () => {
  state.array = state.array.concat({ amount: 52234 });
  state.deep.nest = !state.deep.nest;
};
const One = connect(() => (
  <div style={{ margin: 20 }} onClick={action1}>
    {console.log("1 deep")}
    {state.array.concat({ amount: 1233 }).map(data => (
      <span>{data.amount} </span>
    ))}
    {state.deep.nest.toString()}
  </div>
));

const action2 = () => {
  state.count += 1;
};
const Two = connect(() => (
  <div style={{ margin: 20 }} onClick={action2}>
    {console.log("2 count")}
    {state.count}
  </div>
));

const action3 = () => {
  state.array.push({ amount: 123 });
  state.array.unshift({ amount: 123 });
};
const Three = connect(() => (
  <div style={{ margin: 20 }} onClick={action3}>
    {console.log("3 ARRAY")}
    {state.array.map((data, i) => (
      <div key={i}>{data.amount}</div>
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
