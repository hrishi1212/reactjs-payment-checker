import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

test("renders Login page heading", () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider
        value={{ token: null, login: jest.fn(), logout: jest.fn() }}
      >
        <LoginPage />
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const heading = screen.getByRole("heading", { name: /login/i });
  expect(heading).toBeInTheDocument();
});
