import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProfilePage from "../ProfilePage";
import { BrowserRouter } from "react-router-dom";
import { fetchUser } from "../../services/api";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the fetchUser function
jest.mock("../../services/api", () => ({
  fetchUser: jest.fn(),
}));

// Mock the useAuth hook
jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("ProfilePage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test("displays user name and email correctly", async () => {
    const mockUser = {
      full_name: "John Doe",
      email: "john.doe@example.com",
      Company: { name: "Tech Corp" },
      roles: "Admin",
    };

    // Mock the useAuth hook to return a valid token
    require("../../context/AuthContext").useAuth.mockReturnValue({
      token: "valid-token",
    });

    // @ts-ignore - we know it's mocked
    fetchUser.mockResolvedValue({ user: mockUser });
    mockNavigate.mockClear();

    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    // Check that the loading message is displayed initially
    expect(screen.getByText("Loading user info...")).toBeInTheDocument();

    // Wait for the user data to be rendered and check the content
    await waitFor(() => {
      expect(screen.getByText("Welcome John Doe")).toBeInTheDocument();

      expect(
        screen.getByText(
          (_, element) => element?.textContent === "Email: john.doe@example.com"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          (_, element) => element?.textContent === "Business Name: Tech Corp"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          (_, element) =>
            element?.textContent === "Company Expected Activity: Admin"
        )
      ).toBeInTheDocument();
    });
  });
});
