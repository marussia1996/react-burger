import { getData, postOrderDetails } from "../../utils/api";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_CURRENT_TAB = "SET_CURRENT_TAB";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

//Усилитель получение данных с сервера
export const getIngreedients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log(err);
      });
  };
};
export const getOrder = (ingridientsIdArray) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    postOrderDetails(ingridientsIdArray)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number,
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
