import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import RateRow from "../rateRow/RateRow";
import withLoading from "../HOC/withLoading";
import withError from "../HOC/withError";
import classes from "./Rates.module.css";

const Rates = ({ rates, pinned, togglePinned }) => {
  const onPinChange = symbol => {
    togglePinned(symbol);
  };

  useEffect(() => {
    localStorage.setItem("pinned", JSON.stringify(pinned));
  }, [pinned]);
  const ratesContent = rates.map(([symbol, rate], i) => (
    <RateRow
      key={symbol}
      symbol={symbol}
      rate={rate}
      even={i % 2}
      pinned={pinned.includes(symbol)}
      onPin={onPinChange.bind(this, symbol)}
    />
  ));
  return (
    <div className={classes.Rates}>
      <header className={classes.Header}>
        <div>Currency</div>
        <div>Rate</div>
        <div>Favourite</div>
      </header>
      {ratesContent}
    </div>
  );
};

const mapStateToProps = state => {
  if (state.rates.rates) {
    const originalRates = { ...state.rates.rates };
    const ratio = 1.0 / originalRates[state.rates.base];

    const convertedRates = Object.entries(originalRates).map(([_, value]) => [
      _,
      (value * ratio).toFixed(4)
    ]);

    const pinned =
      convertedRates.filter(([symbol, _]) =>
        state.rates.pinned.includes(symbol)
      ) || [];
    const notPinned =
      convertedRates.filter(
        ([symbol, _]) => !state.rates.pinned.includes(symbol)
      ) || [];

    const rates = [...pinned, ...notPinned];
    return {
      rates,
      pinned: state.rates.pinned,
      isLoading: state.rates.isLoading
    };
  }
  return {
    rates: [],
    pinned: state.rates.pinned,
    isLoading: state.rates.isLoading
  };
};

const mapDispatchToProps = dispatch => ({
  togglePinned: symbol => dispatch(actions.togglePinned(symbol))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(withLoading(Rates)));
