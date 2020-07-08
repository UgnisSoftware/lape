import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SimpleCounter from "./testApp/SimpleCounter";
import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";
import state from "./testApp/state";

describe("WARNING: State is shared if not using Lape testing utils", () => {
  afterAll(() => {
    // reset the changes made in this test
    state.count = 0;
  });

  test("Increments count by one", async () => {
    render(<SimpleCounter />);

    fireEvent.click(screen.getByText(/Simple counter/i));

    await waitFor(() => expect(screen.getByText("Simple counter: 1")).toBeInTheDocument());
  });

  test("Increments count by one again", async () => {
    render(<SimpleCounter />);

    fireEvent.click(screen.getByText(/Simple counter/i));

    await waitFor(() => expect(screen.getByText("Simple counter: 2")).toBeInTheDocument());
  });
});

describe("Simple number change test", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Increments count by one", async () => {
    render(<SimpleCounter />);

    fireEvent.click(screen.getByText(/Simple counter/i));

    await waitFor(() => expect(screen.getByText("Simple counter: 1")).toBeInTheDocument());
  });

  test("Increments count by one again", async () => {
    render(<SimpleCounter />);

    fireEvent.click(screen.getByText(/Simple counter/i));

    await waitFor(() => expect(screen.getByText("Simple counter: 1")).toBeInTheDocument());
  });
});
