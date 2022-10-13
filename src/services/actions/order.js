import { postOrderDetails } from "../../utils/api";
import { CLEAR_INGREDIENTS } from "../actions/currentIngredients";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_PRDER_MODAL = "CLOSE_PRDER_MODAL";

export const getOrder = (ingridientsIdArray) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    postOrderDetails(ingridientsIdArray)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.order.number,
        });
        dispatch({
          type: CLEAR_INGREDIENTS,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(err);
      });
  };
};
export const openModalOrder = () => {
  return function (dispatch) {
    dispatch({
      type: OPEN_ORDER_MODAL,
    });
  };
};
export const closeModalOrder = () => {
  return function (dispatch) {
    dispatch({
      type: CLOSE_PRDER_MODAL,
    });
  };
};
