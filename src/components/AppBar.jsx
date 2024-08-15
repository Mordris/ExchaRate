// src/components/AppBar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Logo from "../assets/logoWhite.png";

const MyAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to="/"
              aria-label="home"
            >
              <img
                src={Logo}
                alt="ExchaRate Logo"
                style={{ height: "40px" }}
              />
            </IconButton>
            <Typography variant="h6">
              ExchaRate
            </Typography>
          </Box>
          <div>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/calculator">
              Calculator
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
