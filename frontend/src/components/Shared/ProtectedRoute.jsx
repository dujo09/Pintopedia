import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { userSession } = useAuth();

  if (!userSession) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
