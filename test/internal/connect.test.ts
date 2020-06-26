import { createNewState } from "./helpers";
import ConnectManager from "lape/connect/ConnectManager";

describe("ConnectManager", () => {
  test("it does not trigger on get", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    ConnectManager.startTracking(mockListener);
    state.count;
    ConnectManager.stopTracking();

    expect(mockListener).toHaveBeenCalledTimes(0);
  });

  test("it triggers when correct state is mutated", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    ConnectManager.startTracking(mockListener);
    state.count;
    ConnectManager.stopTracking();
    state.count = 10;

    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("it does not trigger when not listened state changes", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    ConnectManager.startTracking(mockListener);
    state.count;
    ConnectManager.stopTracking();
    state.deep.nest = false;

    expect(mockListener).toHaveBeenCalledTimes(0);
  });

  test("it triggers only the latest subscriber", () => {
    const state = createNewState();
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    ConnectManager.startTracking(mockListener1);
    ConnectManager.startTracking(mockListener2);
    state.count;
    ConnectManager.stopTracking();
    ConnectManager.stopTracking();
    state.count = 10;

    expect(mockListener1).toHaveBeenCalledTimes(0);
    expect(mockListener2).toHaveBeenCalledTimes(1);
  });

  test("it triggers only on the smallest possible change", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    ConnectManager.startTracking(mockListener);
    state.array[0].amount;
    ConnectManager.stopTracking();

    state.array.push({ amount: 123 });
    expect(mockListener).toHaveBeenCalledTimes(0);

    state.array[1].amount = 333;
    expect(mockListener).toHaveBeenCalledTimes(0);

    state.array[0].amount = 111;
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("it triggers on object change when getting keys", () => {
    const state = createNewState();
    const mockListener = jest.fn();
    ConnectManager.startTracking(mockListener);
    Object.keys(state.users);
    ConnectManager.stopTracking();

    state.users["123-sddgsdf"] = {
      name: "asdawd",
      email: "asdsa",
    };
    expect(mockListener).toHaveBeenCalledTimes(1);
  });
});
