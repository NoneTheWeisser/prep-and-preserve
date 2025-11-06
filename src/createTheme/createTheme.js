import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // your main primary color
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#fff", // text on top of primary color
    },
    secondary: {
      main: "#9c27b0",
      light: "#d05ce3",
      dark: "#6a0080",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5", // page background
      paper: "#fff",       // card/paper background
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontWeight: 700 },
    body1: { fontSize: "1rem" },
  },
});

export default theme;
