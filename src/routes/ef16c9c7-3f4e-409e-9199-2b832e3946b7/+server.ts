import type { RequestHandler } from "./$types";
import { Dynamo } from '$lib/dynamo'
import type { DyData } from "$lib/dynamo";

export const POST:RequestHandler = async ({request}) => {
    const res = (await request.json()) as {datas:DyData[],del:[string, string][]};
    let result = await Dynamo.setAll(res.datas, res.del);
    return new Response(JSON.stringify(result));
}