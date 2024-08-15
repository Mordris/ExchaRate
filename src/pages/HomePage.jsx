import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { fetchLatestRates } from "../api";
import CurrencyCard from "../components/CurrencyCard";
import currencyImageData from "../data/currencyImageData";
import { REQUEST_INTERVAL } from "../api";

const HomePage = () => {
  const [rates, setRates] = useState(() => {
    const savedRates = localStorage.getItem("rates");
    return savedRates ? JSON.parse(savedRates) : [];
  });
  const [loading, setLoading] = useState(true);
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
          const rateEntries = Object.entries(data);
          setRates(rateEntries);
          localStorage.setItem("rates", JSON.stringify(rateEntries));
          setWarning("");
          setWarningVisible(false);
          updateLastRequestTime();
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setWarning(
          "An error occurred while fetching data. Please try again later."
        );
        setWarningVisible(true);
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

  const getCurrencyName = (currency) => {
    const currencyData = currencyImageData.find(
      (item) => item.abbreviation === currency
    );
    return currencyData ? currencyData.currency : "Unknown";
  };

  const MainContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    width: "100%",
    maxWidth: "1200px",
  }));

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
    return (
      <MainContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Latest Currency Rates
      </Typography>
      <WarningText variant="h6" align="center" sx={{ color: "error.main" }}>
        {warning}
      </WarningText>
      {rates.length === 0 ? (
        <Typography variant="h6" align="center">
          No data available. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {rates.map(([currency, rate]) => (
            <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} key={currency}>
              <CurrencyCard
                currency={currency}
                rate={rate}
                currencyName={getCurrencyName(currency)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </MainContainer>
  );
};

export default HomePage;
