import uuid from "react-uuid";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SWAP_INGREDIENT,
  CLEAR_INGREDIENTS,
  TCurrentIngredientActions,
} from "../actions/currentIngredients";
import { TIngredient } from "../types/data";
//тип исходного состояния
type TInitialState = {
  currentIngredients: Array<{uid: string, data: TIngredient}>;
  currentBun: TIngredient | null;
};
// Исходное состояние
const initialState: TInitialState = {
  currentIngredients: [],
  currentBun: null,
};
export const currentIngredientsReducer = (state = initialState, action: TCurrentIngredientActions): TInitialState => {
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
          (el:{uid: string, data: TIngredient}) => el.uid !== action.uid
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
const arrayMove = (arr: Array<{uid: string, data: TIngredient}>, newIndex: number, oldIndex: number) => {
  if (arr.length <= newIndex) {
    let c = newIndex - arr.length + 1;
    while (c--) {
      arr.push();
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};
