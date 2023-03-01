import { D as Dynamo } from "../../../chunks/dynamo.js";
const load = async () => {
  const datas = await Dynamo.getAll();
  return {
    datas
  };
};
export {
  load
};
