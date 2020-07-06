import * as React from "react";
import state from "./state";
import { connect, recordUndo, redo, undo } from "lape";

const actionIncrement = (i) => () => {
  recordUndo(() => {
    state.array[i].amount += 100;
  });
};

const UndoArray = connect(() => (
  <div>
    <button onClick={() => undo()} type="button">
      undo
    </button>
    <button onClick={() => redo()} type="button">
      redo
    </button>
    <button onClick={actionIncrement(0)} type="button">
      Undo Global: {state.array[0]?.amount}
    </button>
  </div>
));

export default connect(UndoArray);
