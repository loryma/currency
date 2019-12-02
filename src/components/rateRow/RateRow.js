import React from "react";
import classes from "./RateRow.module.css";
import Pin from "../Pin/Pin";

const RateRow = ({ symbol, rate, pinned, onPin, even }) => {
  const rateRowClassess = [classes.RateRow, even ? classes.Even : " "].join(
    " "
  );
  return (
    <div className={rateRowClassess}>
      <div>{symbol}</div>
      <div>{rate}</div>
      <Pin onClick={onPin} pinned={pinned} />
    </div>
  );
};

export default RateRow;
