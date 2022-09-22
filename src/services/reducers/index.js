import { combineReducers } from "redux";
import { listIngredientsReducer } from "./listIngregients";
import { orderReducer } from "./order";
import { currentIngredientsReducer } from "./currentIngredients";
import { ingredientReducer } from "./ingredient";
export const rootReducer = combineReducers({
  listIngredients: listIngredientsReducer,
  currentIngredients: currentIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
});
