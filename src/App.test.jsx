import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { useProfile } from "./utils/userProfile";
import { useDbData, useDbUpdate } from "./utils/firebase";
import * as testData from "../saved-data/database_export/nushare-2b5ce-default-rtdb.json";
import { when } from "jest-when";

vi.mock("./utils/userProfile");
vi.mock("./utils/firebase.js");

const testProfile = {
  displayName: "testUser",
  email: "testUser@northwestern.edu",
  profilePic: "https://illustoon.com/photo/590.png",
};

describe("without authentication", () => {
  beforeEach(() => {
    useProfile.mockReturnValue([null]);
    render(<App />);
  });

  it("displays sign in page", () => {
    expect(screen.getByText("SIGN IN")).toBeDefined();
  });
});

describe("after authentication", () => {
  beforeEach(() => {
    useProfile.mockReturnValue([testProfile]);
    when(useDbData).calledWith("/rides").mockReturnValue([testData["rides"]]);
    when(useDbData).calledWith("/users").mockReturnValue([testData["users"]]);
    useDbUpdate.mockReturnValue([null]);
    render(<App />);
  });

  it("verifies user is signed in", () => {
    expect(screen.getByText("Sign out")).toBeDefined();
  });

  it("displays ride from mock data", () => {
    expect(
      screen.getByText(
        "Destination: Chicago O'Hare International Airport (ORD)"
      )
    ).toBeDefined();
  });
});
