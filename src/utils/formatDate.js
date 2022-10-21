export const formatDate = (orderData) => {
  const orderDate = new Date(orderData);
  const isToday = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (orderDate.valueOf() < today - 86400000) {
      // раньше чем вчера
      const delta = now.getTime() - orderDate.getTime();
      return Math.floor(delta / 1000 / 60 / 60 / 24) + " дней назад";
    } else if (orderDate < today) {
      // вчера
      return "Вчера";
    } else {
      // сегодня
      return "Сегодня";
    }
  };
  return `${isToday()}, 
            ${orderDate.getHours()}:${
    orderDate.getMinutes() >= 10
      ? orderDate.getMinutes()
      : `0${orderDate.getMinutes()}`
  } i-GMT+3`;
};
