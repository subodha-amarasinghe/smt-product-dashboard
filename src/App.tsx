import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";
import getTheme from "./theme";
import Dashboard from "./components/pages/Dashboard";


const AppContent: React.FC = () => {
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode ? "dark" : "light");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <DarkModeProvider>
    <AppContent />
  </DarkModeProvider>
);

export default App;
