export const convertDate = (date: string) => {
  const originalDate = new Date(date);

  const formattedDate = originalDate.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};
