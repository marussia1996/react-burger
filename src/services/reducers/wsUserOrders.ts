import {
  USER_ORDER_WS_CONNECTION_SUCCESS,
  USER_ORDER_WS_CONNECTION_ERROR,
  USER_ORDER_WS_CONNECTION_CLOSED,
  USER_ORDER_WS_GET_MESSAGE,
  TWsUserOrders,
} from "../actions/wsUserOrders";
import { TOrder } from "../types/data";
//тип исходного состояния
type TInitialState = {
  wsUserConnected: boolean;
  userOrders: Array<TOrder>,
  total: number;
  totalToday: number;
};
const initialState = {
  wsUserConnected: false,
  userOrders: [],
  total: 0,
  totalToday: 0,
};

export const wsUserOrdersReducer = (state = initialState, action: TWsUserOrders): TInitialState => {
  switch (action.type) {
    case USER_ORDER_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsUserConnected: true,
      };

    case USER_ORDER_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsUserConnected: false,
      };

    case USER_ORDER_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsUserConnected: false,
      };

    case USER_ORDER_WS_GET_MESSAGE:
      return {
        ...state,
        userOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
