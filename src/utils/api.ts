import { baseUrl } from "./constants";
import {getCookie} from './cookie';
//проверка ответа от сервера
const checkResponse = <T>(res: Response):Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    new Error(`Произошла ошибка со статус-кодом ${res.status}`)
  );
};
type TIngredient = {
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
type TOrder = {
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
type TGetIngredients = {
  data: Array<TIngredient>;
  success: boolean;
}
type TPostOrder = {
  name: string;
  order: TOrder;
  success: boolean;
}
type TGetUser = {
  success: boolean;
  user: {email: string, name: string};
}
type TChangePassAndLogout = {
  success: boolean;
  message: string;
}
type TUserInfo = {
  success: boolean;
  user: {email: string, name: string};
  refreshToken: string;
  accessToken: string;
}

//запрос данных
export const getData = async() => {
  return fetch(`${baseUrl}/ingredients`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  }).then((res) => {return checkResponse<TGetIngredients>(res)});
};
//запрос получение номера заказа
export const postOrderDetails = async(ingridientsIdArray: Array<string>) => {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      body: JSON.stringify({
          ingredients: ingridientsIdArray,
      }),
  })
  .then((res)=>checkResponse<TPostOrder>(res))
}
//запрос на авторизацию
export const autorizationUser = async(email: string, password: string) =>{
  return fetch (`${baseUrl}/auth/login`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password
      }),
    })
    .then((res)=>checkResponse<TUserInfo>(res))
}
//запрос на регистрацию пользователя
export const registrationUser = async(email: string, password: string, name: string) =>{
  return fetch (`${baseUrl}/auth/register`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password,
          'name': name
      }),
    })
    .then((res)=>checkResponse<TUserInfo>(res))
}
//запрос на получение токена
export const getAuthToken = async() =>{
  return fetch (`${baseUrl}/auth/token`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": getCookie("refreshToken"),
      }),
    })
    .then((res)=>checkResponse<TUserInfo>(res))
}
//запрос для восстановления пароля
export const forgotPassword = async(email: string) =>{
  return fetch (`${baseUrl}/password-reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
      }),
    })
    .then((res)=>checkResponse<TChangePassAndLogout>(res))
}
//запрос для смены пароля
export const resetPassword = async(password: string, token: string) =>{
  return fetch (`${baseUrl}/password-reset/reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'password': password,
          'token': token
      }),
    })
    .then((res)=>checkResponse<TChangePassAndLogout>(res))
}
//запрос получения данных пользователя
export const getUserData = async() =>{
  return fetch (`${baseUrl}/auth/user`, {
    method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      
    })
    .then((res)=>checkResponse<TGetUser>(res))
}
//запрос обновления данных пользователя
export const updateUserData = async(name: string, email: string, password: string) =>{
  return fetch (`${baseUrl}/auth/user`, {
    method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password,
    }),
    })
    .then((res)=>checkResponse<TGetUser>(res))
}
//запрос выхода из системы
export const logOut = async() => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": getCookie("refreshToken"),
      }),
    })
    .then((res)=>checkResponse<TChangePassAndLogout>(res))
}