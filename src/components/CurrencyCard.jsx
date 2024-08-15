import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  styled,
} from "@mui/material";
import currencyImageData from "../data/currencyImageData";

// Function to get the currency symbol based on abbreviation
const getCurrencySymbol = (currency) => {
  const currencyData = currencyImageData.find(
    (item) => item.abbreviation === currency
  );
  return currencyData ? currencyData.symbol : "Unknown";
};

// Styled component for the card media (symbol)
const SymbolCard = styled(CardMedia)(({ theme }) => ({
  width: 80,
  height: 80,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem", 
  backgroundColor: theme.palette.primary.light,
  borderRadius: "50%",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    width: 100,
    height: 100,
    fontSize: "3rem",
  },
}));

const CurrencyCard = ({ currency, rate, currencyName }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        padding: 3,
        borderRadius: 3,
        boxShadow: 4,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <SymbolCard
        component="div"
        sx={{ width: 80, height: 80, fontSize: "2.5rem" }}
      >
        <span
          dangerouslySetInnerHTML={{ __html: getCurrencySymbol(currency) }}
        />
      </SymbolCard>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          {currencyName}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {currency}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Rate: {rate.toFixed(4)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CurrencyCard;
