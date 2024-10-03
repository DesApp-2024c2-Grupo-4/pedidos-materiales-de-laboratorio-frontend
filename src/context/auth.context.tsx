// AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AuthTokenInfo from "../types/auth-token-info";

const ACCESS_TOKEN_COOKIE = "x-access-token";

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getTokenInfo: () => AuthTokenInfo | null;
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
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get(ACCESS_TOKEN_COOKIE) || null);

  const login = (token: string) => {
    setAuthToken(token);
    Cookies.set(ACCESS_TOKEN_COOKIE, token);
  };

  const logout = () => {
    setAuthToken(null);
    Cookies.remove(ACCESS_TOKEN_COOKIE);
  };

  const isAuthenticated = () => {
    if (isValidAuthToken(authToken)) {
      return true;
    }

    logout();
    return false;
  };

  const getTokenInfo = (): AuthTokenInfo | null => {
    if (!authToken) return null;

    try {
      return jwtDecode(authToken);
    } catch (e) {
      console.error({ e });
      return null;
    }
  };

  const isValidAuthToken = (token: string | null) => {
    if (!token) return false;

    try {
      const currentTime = Date.now() / 1000;
      const { exp } = jwtDecode(token);
      if ((exp || 0) < currentTime) return false;

      return true;
    } catch (e) {
      console.error({ e });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated, getTokenInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
