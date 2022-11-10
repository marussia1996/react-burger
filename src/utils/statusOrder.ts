//определение статуса заказа
export const statusName = (status: string): string | unknown => {
  if (status === "done") {
    return "Выполнен";
  } else if (status === "created") {
    return "Создан";
  } else if (status === "pending") {
    return "Готовится";
  }
};
