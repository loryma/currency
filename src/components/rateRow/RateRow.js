import React from "react";

const rateRow = ({ symbol, rate }) => {
  return (
    <div>
      <div>{symbol}</div>
      <div>{rate}</div>
    </div>
  );
};

export default rateRow;
