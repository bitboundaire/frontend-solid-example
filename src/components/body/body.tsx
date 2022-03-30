import { Box } from "@mui/material";
import { ReactNode } from "react";

const Body = (props: { children: ReactNode }) => (
    <Box style={{ marginTop: 64, height: "100%", width: "100%" }} display="flex" flexDirection="row">
      {props.children}
    </Box>
);

export { Body };
