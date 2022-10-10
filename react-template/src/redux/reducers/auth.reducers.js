import {
    AUTH_FAILURE,
    AUTH_LOADING,
    AUTH_SUCCESS,
    LOGOUT,
  } from '../constants/auth';
  
  const initialState = {
    user: null,
    isLoggedIn: false,
  };
  
  function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case AUTH_LOADING:
        return { ...state, loading: true };
      case AUTH_SUCCESS:
        return {
          ...state,
          loading: false,
          isLoggedIn: true,
          user: payload,
        };
      case AUTH_FAILURE:
        return {
          ...state,
          loading: false,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          loading: false,
          user: null,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  }
  
export default reducer;
  