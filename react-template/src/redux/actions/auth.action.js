import axios from "axios";
import apiCalls from "../../api/api";
import { AUTH_SUCCESS, LOGIN, SIGNUP } from "../constants/auth";

//Action creator
export const authenticate = (type, body) => {
  console.log(body);
  return async (dispatch, getState) => {
    try {
      let res = null;
      switch (type) {
        case LOGIN:
          break;
        case SIGNUP:
          res = await apiCalls.register(body);
          console.log(res);
          localStorage.setItem("userId", res.data.user);
          dispatch({
            type: AUTH_SUCCESS,
            payload: res.data,
          });
          break;
        default:
          res = null;
      }
    } catch (err) {}
  };
};
export const fetchPost = () => {
  return async (dispatch, getState) => {
    const response = await axios.post("http://localhost:5500/user/signup");
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  };
};
