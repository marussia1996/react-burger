export const ADD_INGREDIENT: 'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = "DELETE_INGREDIENT";
export const ADD_BUN: 'ADD_BUN' = "ADD_BUN";
export const SWAP_INGREDIENT: 'SWAP_INGREDIENT' = "SWAP_INGREDIENT";
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = "CLEAR_INGREDIENTS";

export interface IAddIngredient{
    readonly type: typeof ADD_INGREDIENT;
}
export interface IDeleteIngredient{
    readonly type: typeof DELETE_INGREDIENT;
}
export interface IAddBun{
    readonly type: typeof ADD_BUN;
}
export interface ISwapIngredient{
    readonly type: typeof SWAP_INGREDIENT;
}
export interface IClearIngredients{
    readonly type: typeof CLEAR_INGREDIENTS;
}

export type TCurrentIngredientActions = IAddIngredient | IDeleteIngredient | IAddBun | ISwapIngredient | IClearIngredients;