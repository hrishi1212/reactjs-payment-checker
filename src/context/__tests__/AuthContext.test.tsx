import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

test("login stores and retrieves token", () => {
  const { result } = renderHook(() => useAuth(), { wrapper });

  act(() => {
    result.current.login("test-token", 1);
  });

  expect(result.current.token).toBe("test-token");
});
