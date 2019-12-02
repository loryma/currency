import React from "react";
import { Link } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.Container}>
        <Link className={classes.Link} to="/">
          Home
        </Link>
        <Link className={classes.Link} to="/convert">
          Convert
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
