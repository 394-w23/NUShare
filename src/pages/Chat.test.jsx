import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Chat from "./Chat";
import { useProfile } from "src/utils/userProfile";
import { useDbData, useDbUpdate } from "../utils/firebase";
import * as testData from "saved-data/database_export/nushare-2b5ce-default-rtdb.json";
import { when } from "jest-when";

vi.mock("../utils/userProfile");
vi.mock("../utils/firebase.js");

const testProfile = {
  displayName: "testUser",
  email: "testUser@northwestern.edu",
  profilePic: "https://illustoon.com/photo/590.png",
};

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: () => ({
      // ID comes from testData
      id: "200ee784-2dbd-2610-ba58-4c46f5d09ea4",
    }),
  };
});

describe("Chat page", () => {
  beforeEach(() => {
    useProfile.mockReturnValue([testProfile]);
    when(useDbData)
      .calledWith("/chats/200ee784-2dbd-2610-ba58-4c46f5d09ea4")
      .mockReturnValue([
        testData["chats"]["200ee784-2dbd-2610-ba58-4c46f5d09ea4"],
      ]);
    useDbUpdate.mockReturnValue([null]);
    render(<Chat />);
  });

  it("verifies chat messages display", () => {
    expect(
      screen.getByText(`For anyone joining, please be on time!`)
    ).toBeDefined();
    expect(screen.getByText(`Thanks`)).toBeDefined();
  });
});
