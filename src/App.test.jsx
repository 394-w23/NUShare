import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("unit tests", () => {
  test("Welcome label for user should appear in the login page", () => {
    render(<App />);
    expect(screen.getByText("Welcome to NUShare")).toBeDefined();
  });
});
