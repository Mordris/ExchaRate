import React from "react";
import { Typography, Grid } from "@mui/material";

const ConversionResult = ({ amount, fromCurrency, toCurrency, result }) => {
  return (
    result !== null && (
      <Grid item xs={12}>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </Typography>
      </Grid>
    )
  );
};

export default ConversionResult;
