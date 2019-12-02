import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const activeStyles = {
    fontWeight: "bold",
    color: "var(--green)"
  };
  return (
    <div className={classes.Navigation}>
      <div className={classes.Container}>
        <NavLink
          exact
          activeStyle={activeStyles}
          className={classes.Link}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          exact
          activeStyle={activeStyles}
          className={classes.Link}
          to="/convert"
        >
          Convert
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
