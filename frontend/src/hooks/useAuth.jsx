import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [userSession, setUserSession] = useLocalStorage("userSession", null);
  const navigate = useNavigate();

  const login = async (data) => {
    console.log("Setting into local storage: " + data.token);
    setUserSession(data);
    navigate("/beers");
  };

  const logout = () => {
    setUserSession(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      userSession,
      login,
      logout,
    }),
    [userSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
