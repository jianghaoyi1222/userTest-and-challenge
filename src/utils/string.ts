import moment from "moment";

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const formatDate = function (
  date?: string,
  format: string = DEFAULT_DATE_FORMAT
): string {
  return date ? moment(date).locale("en").format(format) : "";
};

export const howLongBefore = function (date?: string): string {
  let days = moment().diff(moment(date), "days");
  let hrs = moment().diff(moment(date), "hours");
  let mins = moment().diff(moment(date), "minutes");

  return days > 0 ? `${days}天前` : hrs > 0 ? `${hrs}小时前` : mins > 0?`${mins}分钟前`:"刚刚";
};
