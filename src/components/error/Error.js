import React from "react";
import classes from "./Error.module.css";

const Error = ({ error, onClick }) => {
  const classesError = [classes.Error, error ? classes.Active : ""].join(" ");
  return (
    <div className={classesError}>
      <div className={classes.Background} onClick={onClick}></div>
      <div
        className={classes.Text}
        style={{ display: error ? "flex" : "none" }}
      >
        <div>{error && error.message}</div>
        <button className={classes.Button} type="button" onClick={onClick}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Error;
