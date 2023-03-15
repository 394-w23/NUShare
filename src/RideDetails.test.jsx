import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import RideDetails from "./components/rides/RideDetails";
import { useProfile } from "./utils/userProfile";
import { useDbData, useDbUpdate } from "./utils/firebase";
import * as testData from "../saved-data/database_export/nushare-2b5ce-default-rtdb.json";
import { when } from "jest-when";

vi.mock("./utils/userProfile");
vi.mock("./utils/firebase.js");

const testLocation = {
    ride: "testRide",
    rideId: "ride123",
    userId: "1234",
  };

const testProfile = {
    displayName: "testUser",
    email: "testUser@northwestern.edu",
    profilePic: "https://illustoon.com/photo/590.png",
};

describe.skip("ride details", () => {
  beforeEach(() => {
    useLocation.mockReturnValue([testLocation]);
    useProfile.mockReturnValue([testProfile]);
    when(useDbData).calledWith("/rides").mockReturnValue([testData["rides"]]);
    when(useDbData).calledWith("/users").mockReturnValue([testData["users"]]);
    useDbUpdate.mockReturnValue([null]);
    render(<RideDetails />);
  });

  it.skip("shows ride details", () => {
    expect(screen.getByText("Pickup Location")).toBeDefined();
    expect(screen.getByText("Pickup Date")).toBeDefined();
  })

  it.skip("renders chat button", () => {
    const chatButton = screen.getByTestId("chatButton");
    fireEvent.click(chatButton);
    expect(screen.getByText("Group Chat")).toBeDefined();
  });
});
