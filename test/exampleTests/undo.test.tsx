import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UndoGlobal from "./testApp/UndoGlobal";
import UndoGlobalLocal from "./testApp/UndoGlobalLocal";
import UndoLocal from "./testApp/UndoLocal";
import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";

describe("Undo tests", () => {
  // you should add this to Jests setupFilesAfterEnv step, so you wouldn't have to copy paste it to every test
  beforeEach(() => {
    lapeTrackAllChanges();
  });

  afterEach(() => {
    lapeResetAllChanges();
  });

  test("Undo global", async () => {
    render(<UndoGlobal />);

    expect(screen.getByText("Undo Global: 1233")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Undo Global: 1233"));
    await waitFor(() => expect(screen.getByText("Undo Global: 1333")).toBeInTheDocument());

    fireEvent.click(screen.getByText("undo"));
    await waitFor(() => expect(screen.getByText("Undo Global: 1233")).toBeInTheDocument());

    fireEvent.click(screen.getByText("redo"));
    await waitFor(() => expect(screen.getByText("Undo Global: 1333")).toBeInTheDocument());
  });

  test("Undo local", async () => {
    render(<UndoLocal />);

    expect(screen.getByText("Undo Local: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Undo Local/i));
    await waitFor(() => expect(screen.getByText("Undo Local: 3")).toBeInTheDocument());

    fireEvent.click(screen.getByText("undo"));
    await waitFor(() => expect(screen.getByText("Undo Local: 0")).toBeInTheDocument());

    fireEvent.click(screen.getByText("redo"));
    await waitFor(() => expect(screen.getByText("Undo Local: 3")).toBeInTheDocument());
  });

  test("Undo mixed", async () => {
    render(<UndoGlobalLocal />);

    expect(screen.getByText("G:0, L:0")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/G:/i));
    await waitFor(() => expect(screen.getByText("G:1, L:1")).toBeInTheDocument());

    fireEvent.click(screen.getByText("undo"));
    await waitFor(() => expect(screen.getByText("G:0, L:0")).toBeInTheDocument());

    fireEvent.click(screen.getByText("redo"));
    await waitFor(() => expect(screen.getByText("G:1, L:1")).toBeInTheDocument());
  });
});
