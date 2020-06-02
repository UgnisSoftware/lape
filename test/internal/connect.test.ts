import { createNewState } from "./helpers";
import { Emitter } from "../../src";

describe("EventEmitter get listeners", () => {
  test("it allows removing event listeners", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    Emitter.listenGetEvents(mockListener);
    Emitter.removeGetListener(mockListener);
    state.count;

    expect(mockListener).toHaveBeenCalledTimes(0);
  });
});
