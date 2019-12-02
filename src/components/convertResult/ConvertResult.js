import React from "react";
import { connect } from "react-redux";

const ConvertResult = ({ result, isLoading }) => {
  return isLoading || !result ? null : (
    <div>
      <span>Conversion result:</span> <span>{result}</span>
    </div>
  );
};

const mapStateToProps = state => ({
  result: state.convert.value,
  isLoading: state.convert.isLoading
});

export default connect(mapStateToProps)(ConvertResult);
