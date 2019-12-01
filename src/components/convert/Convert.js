import React, { useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Select from "../Select/Select";

const Convert = ({ convertCurrency }) => {
  const [field, setField] = useState({ from: "UAH", to: "USD" });
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
    <form onSubmit={onSubmit}>
      <Select value={field.from} onChange={onFieldChange.bind(this, "from")} />
      <Select value={field.to} onChange={onFieldChange.bind(this, "to")} />
      <input value={amount} onChange={onAmountChange} />
      <button type="submit">Convert </button>
    </form>
  );
};

const mapStateToProps = state => ({ isLoading: state.convert.isLoading });

const mapDispatchToProps = dispatch => ({
  convertCurrency: (to, from, amount) =>
    dispatch(actions.convertCurrency(to, from, amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Convert);
