import * as actionTypes from "../actions/actionTypes";

const initialState = { isLoading: false, error: false, value: null };

function convertReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CONVERT_START:
      return { ...state, isLoading: true, error: false };
    case actionTypes.CONVERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        value: action.value
      };
    case actionTypes.CONVERT_ERROR:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

export default convertReducer;
