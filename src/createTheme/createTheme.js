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
    // secondary: {
    //   main: "#8FAE8F",
    //   light: "#C7DCC4",
    //   dark: "#5F7D62",
    //   contrastText: "#000",
    // },
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
    neutral: {
      main: "#8c8c8c",
      light: "#bfbfbf",
      dark: "#5f5f5f",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
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
