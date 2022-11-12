import { TCurrentIngredientActions } from "../actions/currentIngredients";
import { TIngredientActions } from "../actions/ingredient";
import { TListIngredientsActions } from "../actions/listIngredients";
import { TModalActions } from "../actions/modal";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TWsAllOrdersActions } from "../actions/wsAllOrders";
import { TWsUserOrdersActions } from "../actions/wsUserOrders";

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from "../store";
import { rootReducer } from "../reducers";

export type RootState = ReturnType<typeof rootReducer>;
//тип всех экшенов приложения
export type TApplicationActions = TCurrentIngredientActions | 
                            TIngredientActions | 
                            TListIngredientsActions | 
                            TModalActions | 
                            TOrderActions | 
                            TUserActions | 
                            TWsAllOrdersActions | 
                            TWsUserOrdersActions;
// Типизация thunk 
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>; 
// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 