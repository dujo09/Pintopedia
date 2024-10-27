import { Navigate, Route, Routes } from "react-router-dom";
import "./axios/axiosSetup";
import BeerList from "./components/Beer/BeerList";
import { Box, Container, createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import BeerDetailsForm from "./components/Beer/beerDetailsForm";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";
import Login from "./components/Authentification/Login";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./axios/axiosSetup";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { CartProvider } from "./hooks/useCart";

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
      lighter: "#ffffff1f",
    },
  },

  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         variants: [
  //           {
  //             props: (props) => props.variant === "action",
  //             style: {
  //               borderRadius: ".40rem",
  //               marginLeft: ".25rem",
  //               background: "#c7781f",
  //             },
  //           },
  //           {
  //             props: (props) => props.variant === "action" && props.disabled,
  //             style: {
  //               background: "#ffffff1f",
  //             },
  //           },
            
  //         ],
  //       },
  //     },
  //   },
  // },
});

// export const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#e09037",
//     },
//     secondary: {
//       main: "#5fc5f1",
//     },
//     error: {
//       main: "#d32f2f",
//     },
//     success: {
//       main: "#2e7d32",
//     },
//     text: {
//       primary: "#211303",
//     },
//     background: {
//       default: "#f3f0ec",
//       paper: "#f3f0ec",
//     },
//   },
// });

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

      <CartProvider>
        <Box
          sx={{
            maxHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <NavigationBar />

          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/beers"
              element={
                <ProtectedRoute>
                  <BeerList />
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
        </Box>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
