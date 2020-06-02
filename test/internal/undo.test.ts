import { createNewState } from "./helpers";
import { canRedo, canUndo, recordUndo, redo, undo } from "../../src";

describe("Undo and Redo basic functionality", () => {
  test("it works for simple state", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const NEW_COUNT = 5;
    recordUndo(() => {
      state.count = NEW_COUNT;
    });

    expect(state.count).toBe(NEW_COUNT);
    undo();
    expect(state.count).toBe(stateCopy.count);
    redo();
    expect(state.count).toBe(NEW_COUNT);
  });

  test("it works for nested state", () => {
    const state = createNewState();
    recordUndo(() => {
      state.deep.nest = false;
    });

    expect(state.deep.nest).toBe(false);
    undo();
    expect(state.deep.nest).toBe(true);
    redo();
    expect(state.deep.nest).toBe(false);
  });

  test("it works for setting array keys", () => {
    const state = createNewState();
    const newObj = {
      amount: 555,
    };
    recordUndo(() => {
      state.array[5] = newObj;
    });

    expect(state.array.length).toBe(6);
    expect(state.array[5]).toStrictEqual(newObj);
    undo();
    expect(state.array.length).toBe(2);
    expect(state.array[5]).toBe(undefined);
    redo();
    expect(state.array.length).toBe(6);
    expect(state.array[5]).toStrictEqual(newObj);
  });

  test("it works for deleting array keys", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    recordUndo(() => {
      state.array.pop();
    });

    expect(state.array.length).toBe(1);
    expect(state.array).toStrictEqual([stateCopy.array[0]]);
    undo();
    expect(state.array.length).toBe(2);
    redo();
    expect(state.array.length).toBe(1);
    expect(state.array).toStrictEqual([stateCopy.array[0]]);
  });

  test("it works for array PUSH", () => {
    const state = createNewState();
    const newObj = {
      amount: 555,
    };
    recordUndo(() => {
      state.array.push(newObj);
    });

    expect(state.array.length).toBe(3);
    expect(state.array[2]).toStrictEqual(newObj);
    undo();
    expect(state.array.length).toBe(2);
    redo();
    expect(state.array.length).toBe(3);
    expect(state.array[2]).toStrictEqual(newObj);
  });

  test("it works for array UNSHIFT", () => {
    const state = createNewState();
    const newObj = {
      amount: 555,
    };
    recordUndo(() => {
      state.array.unshift(newObj);
    });

    expect(state.array.length).toBe(3);
    expect(state.array[0]).toStrictEqual(newObj);
    undo();
    expect(state.array.length).toBe(2);
    redo();
    expect(state.array.length).toBe(3);
    expect(state.array[0]).toStrictEqual(newObj);
  });

  test("it works for array SHIFT", () => {
    const state = createNewState();

    recordUndo(() => {
      state.array.shift();
    });

    expect(state.array.length).toBe(1);
    undo();
    expect(state.array.length).toBe(2);
    redo();
    expect(state.array.length).toBe(1);
  });

  test("it works for array FILL", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const newObj = {
      amount: 555,
    };
    recordUndo(() => {
      state.array.fill(newObj, 0, 5);
    });

    expect(state.array.length).toBe(2);
    expect(state.array[0]).toStrictEqual(newObj);
    expect(state.array[1]).toStrictEqual(newObj);
    undo();
    expect(state.array.length).toBe(2);
    expect(state.array).toStrictEqual(stateCopy.array);
    redo();
    expect(state.array.length).toBe(2);
    expect(state.array[0]).toStrictEqual(newObj);
    expect(state.array[1]).toStrictEqual(newObj);
  });

  test("it works for array REVERSE", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    recordUndo(() => {
      state.array.reverse();
    });

    expect(state.array.length).toBe(2);
    expect(state.array[0]).toStrictEqual(stateCopy.array[1]);
    expect(state.array[1]).toStrictEqual(stateCopy.array[0]);
    undo();
    expect(state.array.length).toBe(2);
    expect(state.array).toStrictEqual(stateCopy.array);
    redo();
    expect(state.array.length).toBe(2);
    expect(state.array[0]).toStrictEqual(stateCopy.array[1]);
    expect(state.array[1]).toStrictEqual(stateCopy.array[0]);
  });

  test("it works for array SPLICE", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    recordUndo(() => {
      state.array.splice(0, 1);
    });

    expect(state.array.length).toBe(1);
    undo();
    expect(state.array.length).toBe(2);
    expect(state.array).toStrictEqual(stateCopy.array);
    redo();
    expect(state.array.length).toBe(1);
  });

  test("it works for array SORT", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    recordUndo(() => {
      state.array.sort((a, b) => (a.amount > b.amount ? -1 : 1));
    });

    expect(state.array.length).toBe(2);
    expect(state.array[0]).toStrictEqual(stateCopy.array[1]);
    expect(state.array[1]).toStrictEqual(stateCopy.array[0]);
    undo();
    expect(state.array.length).toBe(2);
    expect(state.array).toStrictEqual(stateCopy.array);
    redo();
    expect(state.array.length).toBe(2);
    expect(state.array[0]).toStrictEqual(stateCopy.array[1]);
    expect(state.array[1]).toStrictEqual(stateCopy.array[0]);
  });
});

describe("Undo and Redo additional features", () => {
  test("it allows multiple stacks", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const STACK_1 = "stack_1";
    const STACK_2 = "stack_2";
    const NEW_COUNT = 5;
    recordUndo(() => {
      state.count = NEW_COUNT;
    }, STACK_1);
    recordUndo(() => {
      state.array.pop();
    }, STACK_2);

    expect(state.count).toBe(NEW_COUNT);
    expect(state.array.length).toBe(1);
    undo(STACK_1);
    expect(state.count).toBe(stateCopy.count);
    expect(state.array.length).toBe(1);
    redo(STACK_1);
    expect(state.count).toBe(NEW_COUNT);
    expect(state.array.length).toBe(1);

    undo(STACK_2);
    expect(state.array.length).toBe(2);
    expect(state.count).toBe(NEW_COUNT);
    redo(STACK_2);
    expect(state.array.length).toBe(1);
    expect(state.array).toStrictEqual([stateCopy.array[0]]);
    expect(state.count).toBe(NEW_COUNT);
  });

  test("it records redo on undo, not on event", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const NEW_COUNT = 5;
    const NEW_COUNT_2 = 10;
    recordUndo(() => {
      state.count = NEW_COUNT;
    });

    expect(state.count).toBe(NEW_COUNT);
    state.count = NEW_COUNT_2;
    undo();
    expect(state.count).toBe(stateCopy.count);
    redo();
    expect(state.count).toBe(NEW_COUNT_2);
  });

  test("it records multiple changes", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const NEW_COUNT = 5;
    recordUndo(() => {
      state.count = NEW_COUNT;
      state.array.pop();
    });

    expect(state.count).toBe(NEW_COUNT);
    expect(state.array.length).toBe(1);
    expect(state.array).toStrictEqual([stateCopy.array[0]]);
    undo();
    expect(state.count).toBe(stateCopy.count);
    expect(state.array.length).toBe(2);
    redo();
    expect(state.count).toBe(NEW_COUNT);
    expect(state.array.length).toBe(1);
    expect(state.array).toStrictEqual([stateCopy.array[0]]);
  });

  test("canUndo works", () => {
    const state = createNewState();
    const NEW_COUNT = 5;
    expect(canUndo()).toBe(false);

    recordUndo(() => {
      state.count = NEW_COUNT;
    });

    expect(canUndo()).toBe(true);
    undo();
    expect(canUndo()).toBe(false);
    redo();
    expect(canUndo()).toBe(true);
  });

  test("canRedo works", () => {
    const state = createNewState();
    const NEW_COUNT = 5;
    expect(canRedo()).toBe(false);

    recordUndo(() => {
      state.count = NEW_COUNT;
    });

    expect(canRedo()).toBe(false);
    undo();
    expect(canRedo()).toBe(true);
    redo();
    expect(canRedo()).toBe(false);
  });

  test("multiple undo does nothing", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const NEW_COUNT = 5;
    undo();
    undo();
    undo();

    recordUndo(() => {
      state.count = NEW_COUNT;
    });

    expect(state.count).toBe(NEW_COUNT);
    undo();
    expect(state.count).toBe(stateCopy.count);
    undo();
    undo();
    undo();
    undo();
    expect(state.count).toBe(stateCopy.count);
    redo();
    expect(state.count).toBe(NEW_COUNT);
  });

  test("multiple redo does nothing", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const NEW_COUNT = 5;
    redo();
    redo();
    redo();

    recordUndo(() => {
      state.count = NEW_COUNT;
    });

    expect(state.count).toBe(NEW_COUNT);
    redo();
    redo();
    expect(state.count).toBe(NEW_COUNT);
    undo();
    expect(state.count).toBe(stateCopy.count);
    redo();
    expect(state.count).toBe(NEW_COUNT);
    redo();
    redo();
    redo();
    expect(state.count).toBe(NEW_COUNT);
  });
});
