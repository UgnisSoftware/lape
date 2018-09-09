import * as React from "react";
import * as ReactDom from "react-dom";
import { connect } from "./connect";
import state from "@state";

const action1 = () => {
  state.deep.nest = !state.deep.nest;
};
const One = connect(() => (
  <div style={{ margin: 20 }} onClick={action1}>
    {console.log('one')}
    {state.deep.nest.toString()}
  </div>
));

const action2 = () => {
  state.count += 1;
};
const Two = connect(() => (
  <div style={{ margin: 20 }} onClick={action2}>
    {console.log('two')}
    {state.count}
  </div>
));

class App extends React.Component {
  render() {
    console.log("app");
    return (
      <div>
        <One />
        <Two />
      </div>
    );
  }
}

const WrappedApp = connect(App);

ReactDom.render(<WrappedApp />, document.body);
