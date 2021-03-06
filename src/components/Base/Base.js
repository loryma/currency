import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Select from "../Select/Select";

const Base = ({ changeBase, currentBase }) => {
  useEffect(() => {
    localStorage.setItem("base", JSON.stringify(currentBase));
  }, [currentBase]);
  const onChange = e => {
    const value = e.target.value;
    changeBase(value);
  };
  return (
    <div>
      Select base currency: <Select value={currentBase} onChange={onChange} />
    </div>
  );
};

const mapStateToProps = state => ({ currentBase: state.rates.base });

const mapDispatchToProps = dispatch => ({
  changeBase: base => dispatch(actions.changeBase(base))
});

export default connect(mapStateToProps, mapDispatchToProps)(Base);
