const initialState = {
  base: "USD",
  rates: {}
};

function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_RATES_START":
      return { ...state, isLoading: true, error: false };
    case "FETCH_RATES_SUCCESS":
      return {
        ...state,
        rates: { ...action.rates },
        isLoading: false
      };
    case "FETCH_RATES_FAIL":
      return { ...state, isLoading: false };
    case "CHANGE_BASE":
      return { ...state, base: action.base };
    default:
      return state;
  }
}

export default currencyReducer;
