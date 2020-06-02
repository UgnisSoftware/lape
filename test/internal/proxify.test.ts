import { Emitter } from "../../src";
import { deletedValue, trackAll } from "../../src/proxify";
import { createNewState } from "./helpers";

describe("EventEmitter get listeners", () => {
  test("it allows removing event listeners", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);
    Emitter.removeGetListener(mockListener);
    state.count;

    expect(mockListener).toHaveBeenCalledTimes(0);
  });

  test("it triggers get event listener for simple state", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.count;

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state, "count");
  });

  test("it triggers get event listeners for nested state", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.deep.nest;

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenNthCalledWith(1, state, "deep");
    expect(mockListener).toHaveBeenNthCalledWith(2, state.deep, "nest");
  });

  test("it triggers get event listeners for nested state Keys", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    const keys = Object.keys(state.users);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenNthCalledWith(1, state, "users");
    expect(mockListener).toHaveBeenNthCalledWith(2, state.users, trackAll);
    expect(keys).toStrictEqual(["1-id", "2-id"]);
  });

  test("it triggers get event listeners for nested arrays", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array[0].amount;

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(3);
    expect(mockListener).toHaveBeenNthCalledWith(1, state, "array");
    expect(mockListener).toHaveBeenNthCalledWith(2, state.array, "0");
    expect(mockListener).toHaveBeenNthCalledWith(3, state.array[0], "amount");
  });

  // array methods
  test("it triggers get event listeners for array MAP", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.map(() => 1);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array REDUCE", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.reduce((acc, val) => (acc += val.amount), 0);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array CONCAT", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.concat([]);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array COPYWITHIN", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.copyWithin(0, 3, 4);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array ENTRIES", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.entries();

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array EVERY", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.every(() => true);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array FILTER", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.filter(() => true);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array FIND", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.find(() => true);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array FINDINDEX", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.findIndex(() => true);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array FLAT", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.flat();

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array FLATMAP", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.flatMap((a) => a);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array FOREACh", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.forEach(() => 1);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array FOREACh", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.includes({ amount: 1 });

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array INDEXOF", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.indexOf({ amount: 1 });

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array JOIN", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.join("");

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array KEYS", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.keys();

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array LASTINDEXOF", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.lastIndexOf({ amount: 1 });

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array LENGTH", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.length;

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array SOME", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.some(() => true);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array SLICE", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.slice(0, 3);

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });

  test("it triggers get event listeners for array VALUES", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);

    state.array.values();

    Emitter.removeGetListener(mockListener);

    expect(mockListener).toHaveBeenCalledWith(state.array, trackAll);
  });
});

describe("EventEmitter set listeners", () => {
  test("it allows removing event listeners", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);
    Emitter.removeSetListener(mockListener);
    state.count += 1;

    expect(mockListener).toHaveBeenCalledTimes(0);
  });

  test("it triggers set event listener for simple state", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    state.count = 5;

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state, "count", 5);
  });

  test("it triggers set event listeners for nested state", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    state.deep.nest = false;

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state.deep, "nest", false);
  });

  test("it triggers set event listeners for deleted state", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    delete state.deep.nest;

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state.deep, "nest", deletedValue);
  });

  test("it triggers set event listeners for setting array keys", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    const newObj = {
      amount: 555,
    };
    state.array[5] = newObj;

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state.array, "5", newObj);
  });

  test("it triggers set event listeners for setting array PUSH", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    const newObj = {
      amount: 555,
    };
    state.array.push(newObj);

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state.array, "1", newObj);
  });

  test("it triggers set event listeners for setting array UNSHIFT", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    const newObj = {
      amount: 555,
    };
    state.array.unshift(newObj);

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenNthCalledWith(1, state.array, "1", {
      amount: 1,
    });
    expect(mockListener).toHaveBeenNthCalledWith(2, state.array, "0", newObj);
  });

  test("it triggers set event listeners for setting array SHIFT", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    state.array.shift();

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state.array, "0", deletedValue);
  });

  test("it triggers set event listeners for setting array POP", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    state.array.pop();

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(state.array, "0", deletedValue);
  });

  test("it triggers set event listeners for setting array FILL", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    const newValue = { amount: 4 };
    state.array.fill(newValue, 0, 2);

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenNthCalledWith(1, state.array, "0", newValue);
    expect(mockListener).toHaveBeenNthCalledWith(2, state.array, "1", newValue);
  });

  test("it triggers set event listeners for setting array REVERSE", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    state.array.reverse();

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenNthCalledWith(1, state.array, "0", stateCopy.array[1]);
    expect(mockListener).toHaveBeenNthCalledWith(2, state.array, "1", stateCopy.array[0]);
  });

  test("it triggers set event listeners for setting array SPLICE", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    state.array.splice(0, 1);

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenNthCalledWith(1, state.array, "0", stateCopy.array[1]);
    expect(mockListener).toHaveBeenNthCalledWith(2, state.array, "1", deletedValue);
  });

  test("it triggers set event listeners for setting array SORT", () => {
    const state = createNewState();
    const stateCopy = createNewState();
    const mockListener = jest.fn();
    Emitter.listenSetEvents(mockListener);

    state.array.sort((a, b) => (a.amount > b.amount ? -1 : 1));

    Emitter.removeSetListener(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenNthCalledWith(1, state.array, "0", stateCopy.array[1]);
    expect(mockListener).toHaveBeenNthCalledWith(2, state.array, "1", stateCopy.array[0]);
  });
});
