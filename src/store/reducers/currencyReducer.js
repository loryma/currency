import * as actionTypes from "../actions/actionTypes";

const initialState = {
  base: "USD",
  rates: null,
  pinned: ["EUR"],
  isLoadin: false,
  error: null
};

function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_RATES_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_RATES_SUCCESS":
      return {
        ...state,
        rates: { ...action.rates },
        isLoading: false,
        error: null
      };
    case "FETCH_RATES_FAIL":
      return { ...state, isLoading: false, error: action.error };
    case "CHANGE_BASE":
      return { ...state, base: action.base };
    case actionTypes.TOGGLE_PINNED:
      let pinned;
      if (state.pinned.includes(action.currency)) {
        pinned = state.pinned.filter(p => p !== action.currency);
      } else {
        pinned = [...state.pinned, action.currency];
      }
      return { ...state, pinned };
    case actionTypes.SET_ALL_PINNED:
      return { ...state, pinned: action.currencies };
    default:
      return state;
  }
}

export default currencyReducer;
