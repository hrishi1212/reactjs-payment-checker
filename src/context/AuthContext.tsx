import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string, expiryMinutes?: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const getValidToken = (): string | null => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (!token || !expiry) return null;

  const now = Date.now();
  if (now > parseInt(expiry, 10)) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return null;
  }

  return token;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(getValidToken());

  const login = (newToken: string, expiryMinutes: number = 60) => {
    const expiry = Date.now() + expiryMinutes * 60 * 1000;
    localStorage.setItem("token", newToken);
    localStorage.setItem("tokenExpiry", expiry.toString());
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setToken(null);
  };

  //Auto logout when token expires
  useEffect(() => {
    if (!token) return;

    const expiry = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);
    const timeout = expiry - Date.now();

    if (timeout <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(logout, timeout);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
