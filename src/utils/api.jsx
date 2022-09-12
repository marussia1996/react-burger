import { baseUrl } from "./constants";
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
  }).then((res) => checkResponse(res));
};
//запрос получение номера заказа
export const postOrderDetails = async(ingridientsIdArray) => {
  fetch(`${baseUrl}/orders`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          ingredients: ingridientsIdArray,
      }),
  })
  .then((res)=>checkResponse(res))
}