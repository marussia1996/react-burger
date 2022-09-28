import {
  REGISTRATION_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
} from "../actions/user";
// Исходное состояние
const initialState = {
  user: null,
  registerRequest: false,
  registerFailed: false,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
