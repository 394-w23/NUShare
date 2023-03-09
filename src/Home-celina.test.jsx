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

describe("after authentication", () => {
  beforeEach(() => {
    useProfile.mockReturnValue([testProfile]);
    when(useDbData).calledWith("/rides").mockReturnValue([testData["rides"]]);
    when(useDbData).calledWith("/users").mockReturnValue([testData["users"]]);
    useDbUpdate.mockReturnValue([null]);
    render(<App />);
  });

  it("shows create ride", () => {
    expect(screen.getByText("Create Ride")).toBeDefined();
  })

  it("displays ord trips on click", () => {
    const toORDButton = screen.getByTestId("toORD");
    fireEvent.click(toORDButton);
    expect(screen.getByText("Destination: Chicago O'Hare International Airport (ORD)")).toBeDefined();
    expect(screen.queryByText("Destination: Chicago Midway International Airport (MDW)")).toBeNull();
    expect(screen.queryByText("Destination: South Campus")).toBeNull();
    expect(screen.queryByText("Destination: North Campus")).toBeNull();
  });
});
