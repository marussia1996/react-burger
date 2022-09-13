import {
  ADD_INGREDIENT,
  SET_BUN,
  DELETE_INGREDIENT,
} from "../actions/currentIngredients";
// Исходное состояние
const initialState = {
  currentIngredients: [],
  currentBun: null,
  currentIdIngredients: [],
};
export const currentIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients, action.payload],
      };
    }
    case SET_BUN: {
      return {
        ...state,
        currentBun: action.payload,
      };
    }
    case DELETE_INGREDIENT: {
    }
    default: {
      return state;
    }
  }
};
