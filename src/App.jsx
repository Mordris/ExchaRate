import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import theme from "./theme";
import GlobalStyle from "./styles";
import { Container, Box } from "@mui/material";
import MyAppBar from "./components/AppBar";
import MyFooter from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <MyAppBar />
          <Container
            component="main"
            disableGutters
            maxWidth={false}
            sx={{ flex: 1, width: "100%", mt: 4, mb: 12 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
            </Routes>
          </Container>
          <MyFooter />
        </Box>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
