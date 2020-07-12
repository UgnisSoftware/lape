import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NestedObject from "./testApp/NestedObject";
import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";

describe("Nested object", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Nested object changes", async () => {
    render(<NestedObject />);

    expect(screen.getByText("Nested object: true")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Nested object/i));

    expect(await screen.findByText("Nested object: false")).toBeInTheDocument();
  });
});
