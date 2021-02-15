import "@testing-library/jest-dom";
import React from "react";
import { lapeResetAllChanges, lapeTrackAllChanges, lapeTrackUseState } from "lape";
import { fireEvent, render, screen } from "@testing-library/react";
import MixingUseState from "./testApp/MixingUseState";
import state from "./testApp/state";

/**
 * useState can prevent lape from tracking changes, for example:
 *
 * ```
 * const [loading, setLoading] = useState(true)
 *
 * if(loading) return null
 *
 * <any state usage here would be ignored after loading is changed and component rerenders
 *  because lape has no idea that component has rerendered>
 *
 * ```
 *
 * The solution is to make useState use lape
 **/

describe("useState work with lape", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("changes are ignored after useState rerenders", async () => {
    render(<MixingUseState />);

    fireEvent.click(screen.getByText(/Loading/i));
    fireEvent.click(screen.getByText(/Simple counter/i));
    fireEvent.click(screen.getByText(/Simple counter/i));
    fireEvent.click(screen.getByText(/Simple counter/i));

    expect(state.count).toBe(3);
    expect(screen.getByText("Simple counter: 0")).toBeInTheDocument();
  });
  test("Using compatibility fixes the problem", async () => {
    lapeTrackUseState();
    render(<MixingUseState />);

    fireEvent.click(screen.getByText(/Loading/i));
    fireEvent.click(screen.getByText(/Simple counter/i));

    expect(screen.getByText("Simple counter: 1")).toBeInTheDocument();
  });
});
