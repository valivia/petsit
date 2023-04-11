import moment from "moment";

export const formatDate = (date: Date) => {
  return moment(date).utc().format("DD/MM, hA");
};
