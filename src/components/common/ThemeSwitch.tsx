import React from "react";
import { useTheme, Tooltip } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import { useDarkMode } from "../../context/DarkModeContext";
import StyledIconButton from "./StyledIconButton";

const ThemeSwitch: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const theme = useTheme();

  return (
    <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <StyledIconButton onClick={toggleDarkMode} size="large" style={{backgroundColor:theme.palette.warning.light}}>
        {darkMode ? (
          <Brightness7Icon style={{ color: theme.palette.warning.dark }} />
        ) : (
          <Brightness2Icon style={{ color: theme.palette.text.primary }} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
};

export default React.memo(ThemeSwitch);