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

const mapStateToProps = state => ({ rates: Object.entries(state.rates.rates) });

export default connect(mapStateToProps)(Rates);
