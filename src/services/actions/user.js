import {
  registrationUser,
  forgotPassword,
  resetPassword,
  autorizationUser,
  getAuthToken,
} from "../../utils/api";
import { setCookie } from "../../utils/cookie";
export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const authUser = (email, password) => {
  return function (dispatch) {
    dispatch({
      type: AUTH_REQUEST,
    });
    autorizationUser(email, password)
      .then((res) => {
        //сохранение токенов
        let authToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        if (authToken) {
          setCookie("authToken", authToken);
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }
        dispatch({
          type: AUTH_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILED,
        });
        console.log(err);
      });
  };
};

export const registerUser = (email, password, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    registrationUser(email, password, name)
      .then((res) => {
        let authToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        if (authToken) {
          setCookie("authToken", authToken);
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }
        dispatch({
          type: REGISTRATION_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_FAILED,
        });
        console.log(err);
      });
  };
};
export const updateToken = () => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    getAuthToken()
      .then((res) => {
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          payload: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
        console.log(err);
      });
  };
};
export const forgotPswUser = (email) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPassword(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
        console.log(err);
      });
  };
};

export const resetPswUser = (password, token) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPassword(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
        console.log(err);
      });
  };
};
