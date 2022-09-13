import { OPEN_MODAL, CLOSE_MODAL } from "../actions/ingredient";
// Исходное состояние
const initialState = {
  currentIngredient: null,
};
export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case CLOSE_MODAL: {
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
