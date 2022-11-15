import { TChangePassAndLogout, TGetIngredients, TGetUser, TPostOrder, TUserInfo } from "../services/types/data";
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
//универсальная функция запроса с проверкой
const request = <T>(url: string, options: RequestInit): Promise<T> => {
  return fetch(url, options).then(res => checkResponse<T>(res))
}
//запрос данных
export const getData = async() => {
  return request<TGetIngredients>(`${baseUrl}/ingredients`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
};
//запрос получение номера заказа
export const postOrderDetails = async(ingridientsIdArray: Array<string>) => {
  return request<TPostOrder>(`${baseUrl}/orders`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      body: JSON.stringify({
          ingredients: ingridientsIdArray,
      }),
  })
}
//запрос на авторизацию
export const autorizationUser = async(email: string, password: string) =>{
  return request<TUserInfo>(`${baseUrl}/auth/login`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password
      }),
    })
}
//запрос на регистрацию пользователя
export const registrationUser = async(email: string, password: string, name: string) =>{
  return request<TUserInfo>(`${baseUrl}/auth/register`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password,
          'name': name
      }),
    })
}
//запрос на получение токена
export const getAuthToken = async() =>{
  return request<TUserInfo>(`${baseUrl}/auth/token`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": getCookie("refreshToken"),
      }),
    })
}
//запрос для восстановления пароля
export const forgotPassword = async(email: string) =>{
  return request<TChangePassAndLogout>(`${baseUrl}/password-reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
      }),
    })
}
//запрос для смены пароля
export const resetPassword = async(password: string, token: string) =>{
  return request<TChangePassAndLogout>(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'password': password,
          'token': token
      }),
    })
}
//запрос получения данных пользователя
export const getUserData = async() =>{
  return request<TGetUser>(`${baseUrl}/auth/user`, {
    method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      
    })
}
//запрос обновления данных пользователя
export const updateUserData = async(name: string, email: string, password: string) =>{
  return request<TGetUser>(`${baseUrl}/auth/user`, {
    method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password,
    }),
    })
}
//запрос выхода из системы
export const logOut = async() => {
  return request<TChangePassAndLogout>(`${baseUrl}/auth/logout`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": getCookie("refreshToken"),
      }),
    })
}