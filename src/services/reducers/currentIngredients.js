import uuid from "react-uuid";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SWAP_INGREDIENT,
  CLEAR_INGREDIENTS,
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
    case SWAP_INGREDIENT: {
      return {
        ...state,
        currentIngredients: arrayMove(
          [...state.currentIngredients],
          action.hoverIndex,
          action.dragIndex
        ),
      };
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: [],
        currentBun: null,
      };
    }
    default: {
      return state;
    }
  }
};
const arrayMove = (arr, newIndex, oldIndex) => {
  if (arr.length <= newIndex) {
    let c = newIndex - arr.length + 1;
    while (c--) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};
