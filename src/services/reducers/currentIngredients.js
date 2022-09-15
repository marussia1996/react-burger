import {
  ADD_BUN,
  ADD_INGREDIENT,
  SET_BUN,
} from "../actions/currentIngredients";
// Исходное состояние
const initialState = {
  currentIngredients: [],
  currentBun: null,
  currentIdIngredients: [],
};
export const currentIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      // if (state.currentBun) {
      return {
        ...state,
        currentBun: action.payload,
        // currentIdIngredients: state.currentIdIngredients
        //   .filter((id) => state.currentBun._id !== id)
        //   .push(action.payload._id),
      };
      // } else {
      //   return {
      //     ...state,
      //     currentBun: action.payload,
      //     // currentIdIngredients: [
      //     //   ...state.currentIdIngredients,
      //     //   action.payload._id,
      //     // ],
      //   };
      // }
    }
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
    default: {
      return state;
    }
  }
};
