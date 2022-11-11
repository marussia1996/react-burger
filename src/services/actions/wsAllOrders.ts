export const ALL_ORDER_WS_CONNECTION_START: 'ALL_ORDER_WS_CONNECTION_START' = "ALL_ORDER_WS_CONNECTION_START";
export const ALL_ORDER_WS_CONNECTION_SUCCESS: 'ALL_ORDER_WS_CONNECTION_SUCCESS' =
  "ALL_ORDER_WS_CONNECTION_SUCCESS";
export const ALL_ORDER_WS_CONNECTION_ERROR: 'ALL_ORDER_WS_CONNECTION_ERROR' = "ALL_ORDER_WS_CONNECTION_ERROR";
export const ALL_ORDER_WS_CONNECTION_CLOSED: 'ALL_ORDER_WS_CONNECTION_CLOSED' = "ALL_ORDER_WS_CONNECTION_CLOSED";
export const ALL_ORDER_WS_GET_MESSAGE: 'ALL_ORDER_WS_GET_MESSAGE' = "ALL_ORDER_WS_GET_MESSAGE";
export const ALL_ORDER_WS_SEND_MESSAGE: 'ALL_ORDER_WS_SEND_MESSAGE' = "ALL_ORDER_WS_SEND_MESSAGE";

export interface IAllOrdersWsConnectionStart{
  readonly type: typeof ALL_ORDER_WS_CONNECTION_START;
}
export interface IAllOrdersWsConnectionSuccess{
  readonly type: typeof ALL_ORDER_WS_CONNECTION_SUCCESS;
}
export interface IAllOrdersWsConnectionError{
  readonly type: typeof ALL_ORDER_WS_CONNECTION_ERROR;
}
export interface IAllOrdersWsConnectionClosed{
  readonly type: typeof ALL_ORDER_WS_CONNECTION_CLOSED;
}
export interface IAllOrdersWsGetMessage{
  readonly type: typeof ALL_ORDER_WS_GET_MESSAGE;
}
export interface IAllOrdersWsSendMesssage{
  readonly type: typeof ALL_ORDER_WS_SEND_MESSAGE;
}

export type TWsAllOrdersActions = IAllOrdersWsConnectionStart | 
                                  IAllOrdersWsConnectionSuccess | 
                                  IAllOrdersWsConnectionError | 
                                  IAllOrdersWsConnectionClosed | 
                                  IAllOrdersWsGetMessage | 
                                  IAllOrdersWsSendMesssage;
                                  
export const wsConnectionOpenAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_START,
  };
};

export const wsConnectionSuccessAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionErrorAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosedAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_CLOSED,
  };
};
//TODO: проверить чем является orders
export const wsGetAllOrders = (orders: Array<string>) => {
  return {
    type: ALL_ORDER_WS_GET_MESSAGE,
    payload: orders,
  };
};
export const wsSendAllOrders = (orders: Array<string>) => {
  return {
    type: ALL_ORDER_WS_SEND_MESSAGE,
    payload: orders,
  };
};
