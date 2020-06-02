import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SimpleCount } from "./testApp/src/app";

test("shows the children when the checkbox is checked", () => {
  const testMessage = "Test Message";

  render(<SimpleCount />);

  expect(screen.queryByText(testMessage)).toBeNull();

  fireEvent.click(screen.getByLabelText(/show/i));

  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
