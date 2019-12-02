import React from "react";
import "./withLoading.css";

const withLoading = Component => {
  const Loader = (
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return function(props) {
    return props.isLoading ? Loader : <Component {...props} />;
  };
};

export default withLoading;
