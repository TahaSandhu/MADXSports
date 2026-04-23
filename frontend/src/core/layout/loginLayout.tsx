import { ReactNode } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

interface Props {
  children: ReactNode;
}

const LoginLayout = ({ children }: Props) => {
  return (
    <Box>
      <Container maxWidth="sm">{children}</Container>
    </Box>
  );
};

export default LoginLayout;
