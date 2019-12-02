import React from "react";
import { connect } from "react-redux";

import RateRow from "../rateRow/RateRow";
import classes from "./Rates.module.css";

const Rates = ({ rates }) => {
  const ratesContent = rates.map(([symbol, rate]) => (
    <RateRow key={symbol} symbol={symbol} rate={rate} />
  ));
  return <div className={classes.Rates}>{ratesContent}</div>;
};

const mapStateToProps = state => {
  const originalRates = { ...state.rates.rates };
  if (originalRates) {
    const ratio = 1.0 / originalRates[state.rates.base];
    console.log(
      ratio,
      originalRates,
      state.rates.base,
      originalRates[state.rates.base]
    );
    const rates = Object.entries(originalRates).map(([_, value]) => [
      _,
      (value * ratio).toFixed(4)
    ]);
    return { rates };
  }
  return { rates: {} };
};

export default connect(mapStateToProps)(Rates);
