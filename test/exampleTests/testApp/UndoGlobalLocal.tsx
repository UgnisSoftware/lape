import * as React from "react";
import state from "./state";
import { connect, recordUndo, redo, undo, useLape } from "lape";

const GlobalLocalUndo = () => {
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
      <button onClick={() => undo()} type="button">
        undo
      </button>
      <button onClick={() => redo()} type="button">
        redo
      </button>
      <div onClick={onClick}>
        G:{state.count}, L:{localState.count}
      </div>
    </div>
  );
};

export default connect(GlobalLocalUndo);
