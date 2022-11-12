export type TIngredient = {
    calories:number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
}
export type TOrder = {
    createdAt: string;
    ingredients: Array<TIngredient>;
    name: string;
    number: number;
    owner: {name: string; email: string; createdAt: string; updatedAt: string};
    price: number; 
    status: string;
    updatedAt: string; 
    _id: string;
}
export type TGetIngredients = {
    data: Array<TIngredient>;
    success: boolean;
}
export type TPostOrder = {
    name: string;
    order: TOrder;
    success: boolean;
}
export type TGetUser = {
    success: boolean;
    user: {email: string, name: string};
}
export type TChangePassAndLogout = {
    success: boolean;
    message: string;
}
export type TUserInfo = {
    success: boolean;
    user: {email: string, name: string};
    refreshToken: string;
    accessToken: string;
}
export type TIngridientsIdArray = Array<string>;
export type TUser = {email: string, name: string};