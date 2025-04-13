import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./pages/LoginPage", () => () => <div>Login Page</div>);
jest.mock("./pages/ProfilePage", () => () => <div>Profile Page</div>);

jest.mock("./context/AuthContext", () => {
  const actual = jest.requireActual("./context/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      token: "mock-token",
      login: jest.fn(),
      logout: jest.fn(),
    }),
  };
});

describe("App routing", () => {
  test("renders LoginPage on /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders ProfilePage on /profile when token exists", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Profile Page")).toBeInTheDocument();
  });

  test("redirects unknown route to /login", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
