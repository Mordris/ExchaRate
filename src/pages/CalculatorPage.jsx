import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import { fetchLatestRates } from "../api";
import CalculatorForm from "../components/Calculator/CalculatorForm";
import ConversionResult from "../components/Calculator/ConversionResult";
import LoadingScreen from "../components/Calculator/LoadingScreen";
import { REQUEST_INTERVAL } from "../api";

const CalculatorPage = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [warningVisible, setWarningVisible] = useState(false);

  const shouldSendRequest = () => {
    const currentTime = Date.now();
    const lastRequestTime = localStorage.getItem("lastRequestTime");
    return (
      !lastRequestTime ||
      currentTime - parseInt(lastRequestTime, 10) >= REQUEST_INTERVAL
    );
  };

  const updateLastRequestTime = () => {
    localStorage.setItem("lastRequestTime", Date.now());
  };

  useEffect(() => {
    const getRates = async () => {
      if (!shouldSendRequest()) {
        setWarning("Please wait a moment before updating the data.");
        setWarningVisible(true);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchLatestRates();
        if (data) {
          setRates(data);
          setError("");
          updateLastRequestTime();
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setError("Failed to fetch currency rates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getRates();
  }, []);

  useEffect(() => {
    if (warning) {
      const clearWarning = setTimeout(() => {
        setWarning("");
        setWarningVisible(false);
      }, REQUEST_INTERVAL);

      return () => clearTimeout(clearWarning);
    }
  }, [warning]);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      const amountNumber = parseFloat(amount);
      setResult(amountNumber >= 0 ? amountNumber * rate : null);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty input or non-negative numbers
    if (value === "" || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setAmount(value);
    }
  };

  const WarningText = styled(Typography)(({ theme }) => ({
    transition: "opacity 0.5s ease-in-out, height 0.5s ease-in-out",
    opacity: 0,
    height: "0px",
    overflow: "hidden",
    visibility: "hidden",
    ...(warningVisible && {
      opacity: 1,
      height: "auto",
      visibility: "visible",
    }),
  }));

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          {error && (
            <Typography
              color="error"
              variant="h6"
              align="center"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}
          <WarningText color="error" variant="h6" align="center" sx={{ mb: 2 }}>
            {warning}
          </WarningText>
          <CalculatorForm
            amount={amount}
            setAmount={handleAmountChange}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
            rates={rates}
          />
          <ConversionResult
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            result={result}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CalculatorPage;
