import React, { useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Select from "../Select/Select";
import Loading from "../HOC/Loading";
import withError from "../HOC/withError";
import classes from "./Convert.module.css";

const Convert = ({ convertCurrency }) => {
  const [field, setField] = useState({ from: "EUR", to: "USD" });
  const [amount, setAmount] = useState(100);

  const onFieldChange = (name, event) => {
    const value = event.target.value;

    setField(state => ({ ...state, [name]: value }));
  };

  const onAmountChange = e => {
    let value = e.target.value.trim();
    if (value) {
      value = value.replace(/\D+/g, "").substring(0, 9);
      setAmount(value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (amount) {
      convertCurrency(field.from, field.to, amount);
    }
  };

  return (
    <form className={classes.Convert} onSubmit={onSubmit}>
      <div className={classes.Row}>
        <label className={classes.Label}>From:</label>
        <Select
          value={field.from}
          onChange={onFieldChange.bind(this, "from")}
        />
      </div>
      <div className={classes.Row}>
        <label className={classes.Label}>To:</label>
        <Select value={field.to} onChange={onFieldChange.bind(this, "to")} />
      </div>
      <div className={classes.Row}>
        <label className={classes.Label}>Amount:</label>
        <input
          className={classes.Input}
          value={amount}
          onChange={onAmountChange}
        />
      </div>

      <button className={classes.Submit} type="submit">
        Convert{" "}
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  isLoading: state.convert.isLoading,
  error: state.convert.error
});

const mapDispatchToProps = dispatch => ({
  convertCurrency: (to, from, amount) =>
    dispatch(actions.convertCurrency(to, from, amount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Loading(Convert)));
