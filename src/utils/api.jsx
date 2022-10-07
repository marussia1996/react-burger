import { baseUrl } from "./constants";
import {getCookie} from './cookie';
//проверка ответа от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    new Error(`Произошла ошибка со статус-кодом ${res.status}`)
  );
};
//запрос данных
export const getData = async() => {
  return fetch(`${baseUrl}/ingredients`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  }).then((res) => {return checkResponse(res)});
};
//запрос получение номера заказа
export const postOrderDetails = async(ingridientsIdArray) => {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          ingredients: ingridientsIdArray,
      }),
  })
  .then((res)=>checkResponse(res))
}
//запрос на авторизацию
export const autorizationUser = async(email, password) =>{
  return fetch (`${baseUrl}/auth/login`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password
      }),
    })
    .then((res)=>checkResponse(res))
}
//запрос на регистрацию пользователя
export const registrationUser = async(email, password, name) =>{
  return fetch (`${baseUrl}/auth/register`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password,
          'name': name
      }),
    })
    .then((res)=>checkResponse(res))
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
    .then((res)=>checkResponse(res))
}
//запрос для восстановления пароля
export const forgotPassword = async(email) =>{
  return fetch (`${baseUrl}/password-reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
      }),
    })
    .then((res)=>checkResponse(res))
}
//запрос для смены пароля
export const resetPassword = async(password, token) =>{
  return fetch (`${baseUrl}/password-reset/reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'password': password,
          'token': token
      }),
    })
    .then((res)=>checkResponse(res))
}
//запрос получения данных пользователя
export const getUserData = async() =>{
  return fetch (`${baseUrl}/auth/user`, {
    method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      
    })
    .then((res)=>checkResponse(res))
}
//запрос обновления данных пользователя
export const updateUserData = async(name, email, password) =>{
  return fetch (`${baseUrl}/auth/user`, {
    method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password,
    }),
    })
    .then((res)=>checkResponse(res))
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
    .then((res)=>checkResponse(res))
}