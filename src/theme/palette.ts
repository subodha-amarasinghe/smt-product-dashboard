import { colors } from "@mui/material";

const palette = {
  primary: {
    main: colors.deepPurple[600],
    light: colors.deepPurple[300],
    dark: colors.deepPurple[900],
    contrastText: colors.common.white,
  },
  secondary: {
    main: colors.deepOrange[500],
    light: colors.deepOrange[300],
    dark: colors.deepOrange[700],
    contrastText: colors.common.white,
  },
  success: {
    main: colors.green[600],
    light: colors.green[300],
    dark: colors.green[800],
    contrastText: colors.common.white,
  },
  error: {
    main: colors.red[600],
    light: colors.red[300],
    dark: colors.red[800],
    contrastText: colors.common.white,
  },
  warning: {
    main: colors.amber[600],
    light: colors.amber[300],
    dark: colors.amber[800],
    contrastText: colors.common.black,
  },
  info: {
    main: colors.lightBlue[600],
    light: colors.lightBlue[300],
    dark: colors.lightBlue[800],
    contrastText: colors.common.white,
  },
  grey: {
    100: colors.grey[100],
    200: colors.grey[200],
    300: colors.grey[300],
    400: colors.grey[400],
    500: colors.grey[500],
    600: colors.grey[600],
    700: colors.grey[700],
    800: colors.grey[800],
    900: colors.grey[900],
  },
  background: {
    light: colors.grey[100],
    dark: colors.grey[900],
    paperLight: colors.common.white,
    paperDark: colors.grey[800],
  },
  text: {
    light: colors.grey[900],
    dark: colors.grey[100],
  },
  appHeaderText: {
    light: colors.common.white,
    dark: colors.purple[100],
  },
  buttons: {
    primary: {
      light: {
        bg: colors.deepPurple[600],
        hover: colors.deepPurple[700],
        text: colors.common.white,
      },
      dark: {
        bg: colors.deepPurple[300],
        hover: colors.deepPurple[400],
        text: colors.grey[900], // dark text looks better on light bg
      },
    },
    secondary: {
      light: {
        bg: colors.deepOrange[500],
        hover: colors.deepOrange[600],
        text: colors.common.white,
      },
      dark: {
        bg: colors.orange[300],
        hover: colors.orange[400],
        text: colors.grey[900],
      },
    },
    success: {
      light: {
        bg: colors.green[600],
        hover: colors.green[700],
        text: colors.common.white,
      },
      dark: {
        bg: colors.green[300],
        hover: colors.green[400],
        text: colors.grey[900],
      },
    },
  },
};

export default palette;
