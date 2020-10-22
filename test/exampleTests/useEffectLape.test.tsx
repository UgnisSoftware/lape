import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";
import DeriveLocalState from "./testApp/UseEffectLape";

describe("UseEffectLape tests", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Derives local state from global", async () => {
    render(<DeriveLocalState />);

    expect(screen.getByText("G:0, L:0")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/G:/i));
    expect(screen.getByText("G:1, L:1")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/G:/i));
    expect(screen.getByText("G:2, L:2")).toBeInTheDocument();
  });
});
