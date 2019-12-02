import React from "react";
import Rates from "../components/rates/Rates";
import Base from "../components/Base/Base";
import classes from "./Page.module.css";

const RatesPage = () => {
  return (
    <div className={classes.Page}>
      <Base />
      <Rates />
    </div>
  );
};
export default RatesPage;
