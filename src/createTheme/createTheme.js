// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BF8C6F",
      light: "#E2BCA3",
      dark: "#9E6B53",
      contrastText: "#fff",
    },
    secondary: {
      main: "#afac9a",
      light: "#d6d4c6",
      dark: "#82816e",
      contrastText: "#000",
    },
    error: {
      main: "#720000", 
      dark: "#500300",
      contrastText: "#fff",
    },
    background: {
      default: "#faf9f4",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       containedPrimary: {
  //         backgroundColor: "#720000",
  //         color: "#fff",
  //         "&:hover": {
  //           backgroundColor: "#500300",
  //         },
  //       },
  //     },
  //   },
  // },
});

export default theme;
