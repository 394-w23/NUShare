import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockData, mockFirebase } from "../../helpers";

// mock firebase
vi.mock("../../utilities/firebase");
/**
 * @jest-environment jsdom
 */
// Given add event modal is open, when the user clicks the save button, the event is added to the database.

describe("Add ride form saves correct attendees", () => {
  it("Given new ride is displayed on page, new ride displays correct attendees", async () => {
    // check if the event has the correct attendees
    const mockUser = {
      uid: "mWWwXj6w8NTQe9gjXxMCkwRSrve5",
      displayName: "Test User",
      email: "test@test.com",
    };
    const mockRide = {
      availableSeats: 5,
      date: "2023-06-30",
      end: { address: "Chicago O'Hare International Airport (ORD)" },
      passengers: ["mWWwXj6w8NTQe9gjXxMCkwRSrve5"],
      start: { address: "South Campus" },
      time: "03:02",
      totalSeats: 6,
    };

    mockFirebase(mockUser);

    const result = render(
      <Ride ride={mockRide} id="200ee784-2dbd-2610-ba58-4c46f5d09ea4" />
    );
    expect(
      window.document.querySelector("#filtered-rides")
    ).not.toBeUndefined();
    expect(!window.document.querySelector("#filtered-rides")).toBe(true);
  });
});
