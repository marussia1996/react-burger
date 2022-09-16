import uuid from "react-uuid";
import update from "immutability-helper";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SWAP_INGREDIENT,
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
        currentIngredients: swap(
          ...state.currentIngredients,
          action.dragIndex,
          action.hoverIndex
        ),
      };
    }
    default: {
      return state;
    }
  }
};
const swap = (arr, x, y) => {
  const z = arr[x];
  arr[x] = arr[y];
  arr[y] = z;
};
