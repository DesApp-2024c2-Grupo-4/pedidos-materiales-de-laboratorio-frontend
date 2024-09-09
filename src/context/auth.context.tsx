// AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("authToken") || null);

  useEffect(() => {
    const accesToken = Cookies.get("x-access-token");
    if (accesToken) setAuthToken(accesToken);
  }, []);

  const login = (token: string) => {
    setAuthToken(token);
    Cookies.set("x-access-token", token);
  };

  const logout = () => {
    setAuthToken(null);
    Cookies.remove("x-access-token");
  };

  return <AuthContext.Provider value={{ authToken, login, logout }}>{children}</AuthContext.Provider>;
};
