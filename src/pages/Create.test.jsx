import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import { mockData, mockFirebase } from "../../helpers";

// mock firebase
vi.mock("../../utilities/firebase");

describe("Given homepage", () => {
  it("When the user clicks on on the create ride button, the add event modal opens", async () => {
    const mockUser = {
      uid: "mWWwXj6w8NTQe9gjXxMCkwRSrve5",
      displayName: "Test User",
      email: "test@test.com",
    };
    // mock firebase
    mockFirebase(mockUser);
    render(<App />);
    // click on the add event button
    const createRideButton =
      window.document.querySelector(".create-ride-title");
    fireEvent.click(createRideButton);
    expect(await screen.findByText(/Create a Ride/i));
  });
});
