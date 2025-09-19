import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useMediaQuery,
    Theme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeSwitch from "../common/ThemeSwitch";

interface AppHeaderProps {
    title?: string
    onMenuClick?: () => void;
}

const StyledAppBar = styled(AppBar)`
  z-index: 1400; /* keep above drawer */
`;

const AppHeader: React.FC<AppHeaderProps> = ({ title="Dashboard", onMenuClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    return (
        <StyledAppBar position="fixed">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Show menu button only on mobile */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={onMenuClick}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ color: theme.palette.appHeaderText }}
                    >
                        {title}
                    </Typography>
                </div>

                <ThemeSwitch />
            </Toolbar>
        </StyledAppBar>
    );
};

export default React.memo(AppHeader);
