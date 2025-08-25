import React, { ReactNode } from "react";
import { Drawer, Toolbar, useMediaQuery, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

interface SidebarProps {
    children: ReactNode;
    mobileOpen?: boolean;
    onClose?: () => void;
}

const drawerWidth = 320;

const StyledSidebar = styled(Drawer)`
  min-width: ${drawerWidth}px;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    box-sizing: border-box;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ children, mobileOpen, onClose }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                slotProps={{
                    paper: {
                        sx: { width: "80%" },
                    }
                }}
            >
                <Toolbar />
                {children}
            </Drawer>
        );
    }

    return (
        <StyledSidebar variant="permanent" anchor="left">
            <Toolbar />
            {children}
        </StyledSidebar>
    );
};

export default Sidebar;
