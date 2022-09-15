import uuid from "react-uuid";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from "../actions/currentIngredients";
// Исходное состояние
const initialState = {
  currentIngredients: [],
  currentBun: null,
};
export const currentIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        currentBun: action.payload,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [
          ...state.currentIngredients,
          { uid: uuid(), data: action.payload },
        ],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].filter(
          (el) => el.uid !== action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
};
