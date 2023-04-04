export const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: undefined });
};
