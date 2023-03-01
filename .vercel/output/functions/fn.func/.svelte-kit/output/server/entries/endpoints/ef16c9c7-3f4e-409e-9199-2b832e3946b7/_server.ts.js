import { D as Dynamo } from "../../../chunks/dynamo.js";
const POST = async ({ request }) => {
  const res = await request.json();
  let result = await Dynamo.setAll(res.datas, res.del);
  return new Response(JSON.stringify(result));
};
export {
  POST
};
