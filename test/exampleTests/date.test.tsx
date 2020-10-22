import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DateComponent from "./testApp/Date";
import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";

describe("Date tests", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Date changes", async () => {
    render(<DateComponent />);

    expect(screen.getByText("Date: 2020-07-01T00:00:00.000Z")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Date/i));

    expect(screen.getByText("Date: 2020-07-02T00:00:00.000Z")).toBeInTheDocument();
  });
});
