import { createTheme } from "@mui/material/styles";
import palette from "./palette";

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: palette.primary,
      secondary: palette.secondary,
      success: palette.success,
      error: palette.error,
      warning: palette.warning,
      info: palette.info,
      grey: palette.grey,
      background: {
        default: mode === "light" ? palette.background.light : palette.background.dark,
        paper: mode === "light" ? palette.background.paperLight : palette.background.paperDark,
      },
      text: {
        primary: mode === "light" ? palette.text.light : palette.text.dark,
      },
      appHeaderText:
        mode === "light"
          ? palette.appHeaderText.light
          : palette.appHeaderText.dark,
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    shape: {
      borderRadius: 8,
    },
  });

export default getTheme;
