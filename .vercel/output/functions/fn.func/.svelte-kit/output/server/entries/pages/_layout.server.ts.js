import { d as datas } from "../../chunks/data.js";
const YM = "2023-02";
const prerender = false;
const ssr = true;
const y = YM.match(/^\d+/)?.[0] ?? "2023";
const m = YM.match(/\d+$/)?.[0] ?? "0";
const date = new Date(Number(y), Number(m) - 1);
const load = () => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    parse: datas
  };
};
export {
  load,
  prerender,
  ssr
};
