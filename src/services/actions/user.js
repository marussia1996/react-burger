import {
  registrationUser,
  forgotPassword,
  resetPassword,
} from "../../utils/api";
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const registerUser = (email, password, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    registrationUser(email, password, name)
      .then((res) => {
        console.log(res);
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
export const forgotPswUser = (email) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPassword(email)
      .then((res) => {
        console.log(res);
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
        console.log(res);
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
