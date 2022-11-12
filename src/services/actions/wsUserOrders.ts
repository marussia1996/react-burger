import { TOrder } from "../types/data";

export const USER_ORDER_WS_CONNECTION_START: 'USER_ORDER_WS_CONNECTION_START' = "USER_ORDER_WS_CONNECTION_START";
export const USER_ORDER_WS_CONNECTION_SUCCESS: 'USER_ORDER_WS_CONNECTION_SUCCESS' =
  "USER_ORDER_WS_CONNECTION_SUCCESS";
export const USER_ORDER_WS_CONNECTION_ERROR: 'USER_ORDER_WS_CONNECTION_ERROR' = "USER_ORDER_WS_CONNECTION_ERROR";
export const USER_ORDER_WS_CONNECTION_CLOSED: 'USER_ORDER_WS_CONNECTION_CLOSED' =
  "USER_ORDER_WS_CONNECTION_CLOSED";
export const USER_ORDER_WS_GET_MESSAGE: 'USER_ORDER_WS_GET_MESSAGE' = "USER_ORDER_WS_GET_MESSAGE";
export const USER_ORDER_WS_SEND_MESSAGE: 'USER_ORDER_WS_SEND_MESSAGE' = "USER_ORDER_WS_SEND_MESSAGE";

export interface IUserOrderWsConnectionStart{
  readonly type: typeof USER_ORDER_WS_CONNECTION_START;
}
export interface IUserOrderWsConnectionSuccess{
  readonly type: typeof USER_ORDER_WS_CONNECTION_SUCCESS;
}
export interface IUserOrderWsConnectionError{
  readonly type: typeof USER_ORDER_WS_CONNECTION_ERROR;
}
export interface IUserOrderWsConnectionFailed{
  readonly type: typeof USER_ORDER_WS_CONNECTION_CLOSED;
}
export interface IUserOrderWsGetMessage{
  readonly type: typeof USER_ORDER_WS_GET_MESSAGE;
  readonly payload: {orders: TOrder[], total: number, totalToday: number}
}
export interface IUserOrderWsSendMessage{
  readonly type: typeof USER_ORDER_WS_SEND_MESSAGE;
  readonly payload: {orders: TOrder[], total: number, totalToday: number}
}

export type TWsUserOrders = IUserOrderWsConnectionStart | 
                            IUserOrderWsConnectionSuccess | 
                            IUserOrderWsConnectionError |
                            IUserOrderWsConnectionFailed | 
                            IUserOrderWsGetMessage | 
                            IUserOrderWsSendMessage;
                            
export const wsConnectionOpenUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_START,
  };
};

export const wsConnectionSuccessUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionErrorUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosedUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_CLOSED,
  };
};
export const wsGetUserOrders = (orders: Array<TOrder>) => {
  return {
    type: USER_ORDER_WS_GET_MESSAGE,
    payload: orders,
  };
};
export const wsSendUserOrders = (orders: Array<TOrder>) => {
  return {
    type: USER_ORDER_WS_SEND_MESSAGE,
    payload: orders,
  };
};
