import React from "react";
import Convert from "../components/convert/Convert";
import ConvertResult from "../components/convertResult/ConvertResult";
import classes from "./Page.module.css";

const ConvertPage = () => {
  return (
    <div className={classes.Page}>
      <Convert />
      <ConvertResult />
    </div>
  );
};

export default ConvertPage;
