import { Box } from "@mui/material";
import { AppBar } from "../app-bar";
import { Body } from "../body/body";
import { SideBar } from "../side-bar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
    <Box height="100%" width="100%">
      <AppBar />
      <Body>
        <SideBar />
        <Box width="100%" style={{ padding: 16 }}>
          {children}
        </Box>
      </Body>
    </Box>
);

export { Layout };
