import { GET_INGREDIENT, CLEAR_INGREDIENT, TIngredientActions } from "../actions/ingredient";
import { TIngredient } from "../types/data";
//тип исходного состояния
type TInitialState = {
  currentIngredient: TIngredient | null;
};
// Исходное состояние
const initialState = {
  currentIngredient: null,
};
export const ingredientReducer = (state = initialState, action: TIngredientActions) :TInitialState => {
  switch (action.type) {
    case GET_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case CLEAR_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
