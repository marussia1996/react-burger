import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_TAB,
  TListIngredientsActions,
} from "../actions/listIngredients";
import { TIngredient } from "../types/data";
//тип исходного состояния
type TInitialState = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed:  boolean;
  currentTab: string;
};
// Исходное состояние
const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: "bun",
};

export const listIngredientsReducer = (state = initialState, action: TListIngredientsActions) :TInitialState => {
  switch (action.type) {
    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab,
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
