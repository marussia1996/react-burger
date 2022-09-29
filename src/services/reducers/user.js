import {
  REGISTRATION_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
} from "../actions/user";
// Исходное состояние
const initialState = {
  user: null,

  authRequest: false,
  authSuccess: false,
  authFailed: false,

  registerRequest: false,
  registerFailed: false,

  forgotPswRequest: false,
  forgotPswFailed: false,
  forgotPswSuccess: false,

  resetPswRequest: false,
  resetPswFailed: false,
  resetPswSuccess: false,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authSuccess: true,
        authFailed: false,
        user: action.payload,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        user: action.payload,
        registerFailed: false,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPswRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPswFailed: false,
        forgotPswRequest: false,
        forgotPswSuccess: action.payload,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPswFailed: true,
        forgotPswRequest: false,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPswRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPswFailed: false,
        resetPswRequest: false,
        resetPswSuccess: action.payload,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPswFailed: true,
        resetPswRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
