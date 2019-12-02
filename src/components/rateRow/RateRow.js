import React from "react";
import classes from "./RateRow.module.css";
import Pin from "../Pin/Pin";

const rateRow = ({ symbol, rate, pinned, onPin }) => {
  return (
    <div className={classes.RateRow}>
      <div>{symbol}</div>
      <div>{rate}</div>
      <Pin onClick={onPin} pinned={pinned} />
    </div>
  );
};

export default rateRow;
