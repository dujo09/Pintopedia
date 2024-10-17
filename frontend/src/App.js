import { Route, Routes } from "react-router-dom";
import "./axios/axiosSetup";
import BeerList from "./components/Beer/BeerList";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import BeerDetailsForm from "./components/Beer/beerDetailsForm";

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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/beers" element={<BeerList />} />
        <Route path="/beers/:beerId" element={<BeerDetailsForm />} />
        <Route path="/beers/create" element={<BeerDetailsForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
