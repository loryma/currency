import * as actionTypes from "./actionTypes";
import axios from "axios";

export const changeBase = base => ({ type: actionTypes.CHANGE_BASE, base });
export const fetchRatesStart = () => ({ type: actionTypes.FETCH_RATES_START });
export const fetchRatesSuccess = rates => ({
  type: actionTypes.FETCH_RATES_SUCCESS,
  rates
});
export const fetchRatesError = error => ({
  type: actionTypes.FETCH_RATES_ERROR,
  error
});

export const fetchRates = () => {
  return dispatch => {
    dispatch(fetchRatesStart());
    return axios
      .get(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then(res => {
        console.log(res);
        if (res.data.rates) {
          const { rates } = res.data;
          dispatch(fetchRatesSuccess(rates));
        }
      })
      .catch(error => {
        dispatch(fetchRatesError(error));
      });
  };
};

export const convertStart = () => ({ type: actionTypes.CONVERT_START });
export const convertSuccess = value => ({
  type: actionTypes.CONVERT_SUCCESS,
  value
});
export const convertError = error => ({
  type: actionTypes.CONVERT_ERROR,
  error
});

export const convertCurrency = (from, to, amount) => {
  return dispatch => {
    return axios
      .get(
        `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=14608e33f51977f87cfe`
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          const value = (Object.values(res.data)[0] * amount).toFixed(2);
          dispatch(convertSuccess(value));
        }
      })
      .catch(error => {
        dispatch(convertError(error));
      });
  };
};

export const togglePinned = currency => {
  localStorage.setItem("pinned", JSON.stringify());
  return {
    type: actionTypes.TOGGLE_PINNED,
    currency
  };
};

export const setAllPinned = currencies => ({
  type: actionTypes.SET_ALL_PINNED,
  currencies
});
