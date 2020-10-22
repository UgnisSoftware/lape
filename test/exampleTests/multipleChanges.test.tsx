import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";
import MultipleChanges from "./testApp/MultipleChanges";

describe("Multiple Changes", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Multiple Changes does not crash", async () => {
    render(<MultipleChanges />);

    expect(screen.getByText("G:0, L:0")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/G:/i));
    expect(screen.getByText("G:1, L:1")).toBeInTheDocument();
  });
});
