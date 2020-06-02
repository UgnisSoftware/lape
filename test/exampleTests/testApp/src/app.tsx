import * as React from "react";
import * as ReactDom from "react-dom";
import state from "./state";
// @ts-ignore
import { connect, useLape, recordUndo, redo, undo } from "lape";

const actionSimple = () => {
  state.count += 1;
};
export const SimpleCount = connect(() => (
  <div style={{ margin: 20 }} onClick={actionSimple}>
    {console.log("1 simple")}
    Simple counter: {state.count}
  </div>
));

const actionDeep = () => {
  state.deep.nest = !state.deep.nest;
};
const DeepChange = connect(() => (
  <div style={{ margin: 20 }} onClick={actionDeep}>
    {console.log("2 deep")}
    {state.deep.nest.toString()}
  </div>
));

const actionIncrement = (i) => () => {
  recordUndo(() => {
    state.array[i].amount += 123;
  });
};
const actionAdd = () => {
  recordUndo(() => {
    state.array.push({ amount: 123 });
  });
};
const actionRemove = (i) => () => {
  recordUndo(() => {
    state.array.splice(i, 1);
  });
};
const Array = connect(() => (
  <div style={{ margin: 20 }}>
    {console.log("3 ARRAY")}
    {state.array.map((data, i) => (
      <div key={i}>
        <div onClick={actionIncrement(i)}>{data.amount}</div>
        <span onClick={actionRemove(i)}>x</span>
      </div>
    ))}
    <div onClick={actionAdd}>add</div>
  </div>
));

const FirstArray = connect(() => (
  <div style={{ margin: 20 }}>
    {console.log("FirstArray")}
    <div>
      <div onClick={actionIncrement(0)}>{state.array[0]?.amount}</div>
    </div>
  </div>
));

const Four = connect(() => {
  const localState = useLape({
    count: 1,
  });

  const onClick = () => {
    recordUndo(() => {
      localState.count = localState.count + 1;
      localState.count = localState.count + 1;
      localState.count = localState.count + 1;
    }, "counts");
  };

  return (
    <div style={{ margin: 20 }}>
      {console.log("4 Local")}
      <span onClick={() => undo("counts")}>{" <="}</span>
      <span>{"      "}</span>
      <span onClick={() => redo("counts")}>{"=>"}</span>
      <div onClick={onClick}>{localState.count}</div>
    </div>
  );
});

const Five = connect(() => {
  const onClick = () => {
    state.date = new Date();
  };

  console.log("date", state.date);

  return (
    <div style={{ margin: 20 }}>
      <div onClick={onClick}>{state.date.toISOString()}</div>
    </div>
  );
});

const Undo = connect(() => {
  const localState = useLape({
    count: 0,
  });
  const onClick = () => {
    recordUndo(() => {
      state.count += 1;
      localState.count += 1;
    });
  };

  return (
    <div style={{ margin: 20 }}>
      <div onClick={onClick}>
        G: {state.count}, L: {localState.count}
      </div>
    </div>
  );
});

const Collection = connect(() => {
  return (
    <div style={{ margin: 20 }}>
      {Object.values(state.users).map((user) => {
        const onClick = () => {
          recordUndo(() => {
            user.name += 1;
            delete user.email;
          });
          state.users["abc" + Math.random()] = {
            name: "kmasdkm",
            email: "kmasdkm@kmasdkm.com",
          };
        };
        return (
          <div onClick={onClick}>
            Name: {user.name}, Email: {user.email}
          </div>
        );
      })}
    </div>
  );
});

class App extends React.Component {
  render() {
    return (
      <div style={{ userSelect: "none" }}>
        <div>
          <span onClick={() => undo()}>{" <="}</span>
          <span>{"      "}</span>
          <span onClick={() => redo()}>{"=>"}</span>
        </div>
        <SimpleCount />
        <DeepChange />
        <FirstArray />
        <Array />
        <Four />
        <Five />
        <Undo />
        <Collection />
      </div>
    );
  }
}

const WrappedApp = connect(App);

ReactDom.render(<WrappedApp />, document.getElementById("editor"));
