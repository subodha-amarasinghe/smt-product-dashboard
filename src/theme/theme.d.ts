// src/theme/theme.d.ts
import { Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    appHeaderText: string;
  }
  interface PaletteOptions {
    appHeaderText?: string;
  }
}
