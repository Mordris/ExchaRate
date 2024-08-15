// src/components/Footer.js
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const MyFooter = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#388e3c", color: "#fff", py: 2, mt: "auto" }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="body2" align="center">
          © 2024 Currency Converter. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default MyFooter;
