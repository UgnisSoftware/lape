import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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

    expect(await screen.findByText("Undo Global: 1233")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Undo Global: 1233"));
    expect(await screen.findByText("Undo Global: 1333")).toBeInTheDocument();

    fireEvent.click(screen.getByText("undo"));
    expect(await screen.findByText("Undo Global: 1233")).toBeInTheDocument();

    fireEvent.click(screen.getByText("redo"));
    expect(await screen.findByText("Undo Global: 1333")).toBeInTheDocument();
  });

  test("Undo local", async () => {
    render(<UndoLocal />);

    expect(await screen.findByText("Undo Local: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Undo Local/i));
    expect(await screen.findByText("Undo Local: 3")).toBeInTheDocument();

    fireEvent.click(screen.getByText("undo"));
    expect(await screen.findByText("Undo Local: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByText("redo"));
    expect(await screen.findByText("Undo Local: 3")).toBeInTheDocument();
  });

  test("Undo mixed", async () => {
    render(<UndoGlobalLocal />);

    expect(await screen.findByText("G:0, L:0")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/G:/i));
    expect(await screen.findByText("G:1, L:1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("undo"));
    expect(await screen.findByText("G:0, L:0")).toBeInTheDocument();

    fireEvent.click(screen.getByText("redo"));
    expect(await screen.findByText("G:1, L:1")).toBeInTheDocument();
  });
});
