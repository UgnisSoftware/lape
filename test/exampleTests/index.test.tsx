import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SimpleCount } from "./testApp/app";

test("shows the children when the checkbox is checked", () => {
  render(<SimpleCount />);

  fireEvent.click(screen.getByText(/Simple counter/i));

  expect(screen.getByText("Simple counter: 1")).toBeInTheDocument();
});
