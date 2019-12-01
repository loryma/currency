import React from "react";
import { connect } from "react-redux";

const ConvertResult = ({ result }) => {
  return (
    <div>
      <span>Conversion result:</span> <span>{result}</span>
    </div>
  );
};

const mapStateToProps = state => ({ result: state.convert.value });

export default connect(mapStateToProps)(ConvertResult);
