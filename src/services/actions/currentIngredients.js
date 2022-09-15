export const ADD_INGREDIENT = "ADD_ELEMENT";
export const SET_BUN = "SET_BUN";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";

export const addBun = (item) => {
  console.log("addBun");
  return {
    type: ADD_BUN,
    payload: item,
  };
};
