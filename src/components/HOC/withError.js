import React, { useState, useEffect } from "react";
import Error from "../error/Error";

const withError = Component => {
  return function(props) {
    const [error, setError] = useState(null);

    const appError = props.error;

    const onErrorDismiss = () => {
      setError(null);
    };

    useEffect(() => {
      if (appError) {
        setError(appError);
      }
    }, [appError]);

    return (
      <>
        <Error error={error} onClick={onErrorDismiss} />
        <Component {...props} />
      </>
    );
  };
};

export default withError;
