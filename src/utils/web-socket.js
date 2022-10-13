// const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
// ws.send("Привет");
// ws.onopen = (event) => {
//   console.log("Соединение установлено");
//   console.log(event.type);
// };
// ws.onmessage = (event) => {
//   //для поддержания общения
//   if (event.data === "ping") {
//     ws.send("pong");
//   }
//   const userMessage = event.data;
//   console.log(userMessage);
// };
// ws.onclose = (event) => {
//   if (event.wasClean) {
//     console.log("Соединение закрыто корректно");
//     console.log(`Код закрытия - ${event.code}`);
//     console.log(`Причина закрытия - ${event.reason}`);
//   } else {
//     console.log(`Соединение закрыто с кодом -  ${event.code}`);
//   }
// };
// ws.onerror = (event) => {
//   console.log(`Ошибка ${event.message}`);
// };
