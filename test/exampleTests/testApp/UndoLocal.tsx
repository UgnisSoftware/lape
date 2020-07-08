import * as React from "react";
import { connect, recordUndo, redo, undo, useLape } from "lape";

const STACK_ID = "counts";

const UndoLocal = () => {
  const localState = useLape({
    count: 0,
  });

  const onClick = () => {
    recordUndo(() => {
      localState.count = localState.count + 1;
      localState.count = localState.count + 1;
      localState.count = localState.count + 1;
    }, STACK_ID);
  };

  return (
    <div style={{ margin: 20 }}>
      <button onClick={() => undo(STACK_ID)} type="button">
        undo
      </button>
      <button onClick={() => redo(STACK_ID)} type="button">
        redo
      </button>
      <div onClick={onClick}>Undo Local: {localState.count}</div>
    </div>
  );
};

export default connect(UndoLocal);
