import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_ORDER_MODAL,
  CLOSE_PRDER_MODAL,
} from "../actions/order";
// Исходное состояние
const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  openModalOrder: false,
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.payload,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        openModalOrder: true,
      };
    }
    case CLOSE_PRDER_MODAL: {
      return {
        ...state,
        openModalOrder: false,
      };
    }
    default: {
      return state;
    }
  }
};
