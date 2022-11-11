import { getData } from "../../utils/api";
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = "GET_INGREDIENTS_FAILED";
export const SET_CURRENT_TAB: 'SET_CURRENT_TAB' = "SET_CURRENT_TAB";

export interface IGetIngredientsRequest{
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess{
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
}
export interface IGetIngredientsFailed{
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface ISetCurrentBun{
  readonly type: typeof SET_CURRENT_TAB;
}

export type TListIngredientsActions = IGetIngredientsRequest | IGetIngredientsSuccess | IGetIngredientsFailed | ISetCurrentBun;

//Усилитель получение данных с сервера
export const getIngreedients = () => {
  return function (dispatch: any) {
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
