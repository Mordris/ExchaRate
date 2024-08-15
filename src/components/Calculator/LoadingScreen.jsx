import React from "react";
import { Container, CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default LoadingScreen;
