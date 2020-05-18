import '@testing-library/jest-dom'
import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";

function HiddenMessage({ children }) {
  const [showMessage, setShowMessage] = React.useState(false);
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        onChange={(e) => setShowMessage(e.target.checked)}
        checked={showMessage}
      />
        {add bug}
      {showMessage ? children : null}
    </div>
  );
}



test("shows the children when the checkbox is checked", () => {
  const testMessage = "Test Message";

  render(<HiddenMessage>{testMessage}</HiddenMessage>);

  expect(screen.queryByText(testMessage)).toBeNull();

  fireEvent.click(screen.getByLabelText(/show/i));

  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
