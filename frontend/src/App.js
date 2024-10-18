import { Navigate, Route, Routes } from "react-router-dom";
import "./axios/axiosSetup";
import BeerList from "./components/Beer/BeerList";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import BeerDetailsForm from "./components/Beer/beerDetailsForm";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";
import Login from "./components/Authentification/Login";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./axios/axiosSetup";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c7781f",
    },
    secondary: {
      main: "#0e749f",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
    text: {
      primary: "#faf8f5",
    },
    background: {
      default: "#090704",
      paper: "#090704",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e09037",
    },
    secondary: {
      main: "#5fc5f1",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
    text: {
      primary: "#211303",
    },
    background: {
      default: "#f3f0ec",
      paper: "#f3f0ec",
    },
  },
});

function App() {
  const { userSession, logout } = useAuth();

  useEffect(() => {
    if (userSession) {
      setupAxiosInterceptors(() => userSession?.token || null, logout);
    }
  }, [userSession, logout]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/beers"
          element={
            <ProtectedRoute>
              {" "}
              <BeerList />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/beers/:beerId"
          element={
            <ProtectedRoute>
              {" "}
              <BeerDetailsForm />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/beers/create"
          element={
            <ProtectedRoute>
              {" "}
              <BeerDetailsForm />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
