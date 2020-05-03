import * as React from "react";
import * as ReactDom from "react-dom";
import { connect, Emitter, useLape } from "@lape";
import state from "./state";

const action1 = () => {
  state.deep.nest = !state.deep.nest;
  state.array[0] = { amount: 52234 };
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
const Two = connect(() => (
  <div style={{ margin: 20 }} onClick={action2}>
    {console.log("2 count")}
    {state.count}
  </div>
));

const action3 = () => {
  state.array.unshift({ amount: 123 });
  // state.array.push({ amount: 123 });
  // state.array = [{ amount: 123 }, { amount: 1111 }]
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

const Four = () => {
  const localState = useLape({
    count: 1,
  });

  const onClick = () => {
    localState.count = localState.count + 1;
    localState.count = localState.count + 1;
    localState.count = localState.count + 1;
  };

  return (
    <div style={{ margin: 20 }}>
      {console.log("4 Local")}
      <div onClick={onClick}>{localState.count}</div>
    </div>
  );
};

const Undo = () => (
  <div>
    <span onClick={Emitter.undo}>{" <="}</span>
    <span>{"      "}</span>
    <span onClick={Emitter.redo}>=></span>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <div>
        <Undo />
        <One />
        <Two />
        <Three />
        <Four />
      </div>
    );
  }
}

const WrappedApp = connect(App);

ReactDom.render(<WrappedApp />, document.getElementById("editor"));
