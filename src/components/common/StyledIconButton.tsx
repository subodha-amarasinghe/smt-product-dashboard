import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[400]}`,
  padding: 8,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
    transform: "scale(1.1)",
  },
}));

export default StyledIconButton;
