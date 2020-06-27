import moment from "moment";
let date = function(value: number | string): string {
  if (!value) return "-";
  return moment(value).format("YYYY-MM-DD");
};

let time = function(value: number | string): string {
  if (!value) return "-";
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
};

let money = function(n) {
  let N = !isNaN(Number(n)) ? Number(n) : 0;
  return N.toLocaleString("zh", {
    style: "decimal",
    currency: "cny",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2, //最少保留小数的位数
    maximumFractionDigits: 2, //最多保留小数的位数
    useGrouping: true
  });
};
export default {
  date,
  time,
  money
};
