export const getTodaysCookie = () =>
  `ADMIN_${new Date().toISOString().split("T")[0]}`;
