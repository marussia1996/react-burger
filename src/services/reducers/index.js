import { combineReducers } from "redux";
import { listIngredientsReducer } from "./listIngregients";
import { orderReducer } from "./order";
import { currentIngredientsReducer } from "./currentIngredients";
import { ingredientReducer } from "./ingredient";
import { userReducer } from "./user";
import { modalReducer } from "./modal";
import { wsAllOrdersReducer } from "./wsAllOrders";
export const rootReducer = combineReducers({
  listIngredients: listIngredientsReducer,
  currentIngredients: currentIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  modal: modalReducer,
  wsAllOrders: wsAllOrdersReducer,
});
