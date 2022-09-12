import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_TAB,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/data";
// Исходное состояние
const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentTab: "bun",

  currentIngredients: [],
  currentBun: null,
  currentIdIngredients: [],

  currentIngredient: {},
  order: null,
  orderRequest: false,
  orderFailed: false,
};
export const dataReducer = (state = initialState, action) => {
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
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
