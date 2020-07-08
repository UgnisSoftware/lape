import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";
import Array from "./testApp/Array";

describe("Array tests", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Array operations", async () => {
    render(<Array />);

    expect(screen.getByText("Array 0: 1233")).toBeInTheDocument();

    fireEvent.click(screen.getByText("increment 0"));
    await waitFor(() => expect(screen.getByText("Array 0: 1333")).toBeInTheDocument());

    fireEvent.click(screen.getByText("add"));
    await waitFor(() => expect(screen.getByText("Array 1: 123")).toBeInTheDocument());

    fireEvent.click(screen.getByText("increment 1"));
    await waitFor(() => expect(screen.getByText("Array 1: 223")).toBeInTheDocument());

    fireEvent.click(screen.getByText("remove 1"));
    await waitFor(() => expect(screen.queryByText("Array 1: 223")).not.toBeInTheDocument());
  });
});
