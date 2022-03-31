import React, { ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import "../index.css";

const theme = createTheme();

const Theme = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
);

export { Theme };
