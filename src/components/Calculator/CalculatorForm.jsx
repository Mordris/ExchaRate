import React from "react";
import { TextField, Grid } from "@mui/material";

const CalculatorForm = ({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  rates,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={setAmount}
          fullWidth
          variant="outlined"
          margin="normal"
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="From Currency"
          select
          SelectProps={{
            native: true,
          }}
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="To Currency"
          select
          SelectProps={{
            native: true,
          }}
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default CalculatorForm;
