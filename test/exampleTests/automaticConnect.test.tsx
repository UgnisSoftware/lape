/** @jsxImportSource lape */
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import UnconnectedCounter from "./testApp/UnconnectedComponent";
import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";

describe("Simple number change test", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Increments count by one", async () => {
    render(<UnconnectedCounter />);

    fireEvent.click(screen.getByText(/Simple counter/i));

    expect(screen.getByText("Simple counter: 1")).toBeInTheDocument();
  });

  test("Increments count by three", async () => {
    render(<UnconnectedCounter />);

    fireEvent.click(screen.getByText(/Simple counter/i));
    fireEvent.click(screen.getByText(/Simple counter/i));
    fireEvent.click(screen.getByText(/Simple counter/i));

    expect(screen.getByText("Simple counter: 3")).toBeInTheDocument();
  });
});
