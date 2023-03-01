import type { RequestHandler } from "./$types";
import { Dynamo } from '$lib/dynamo'
import type { DyData } from "$lib/dynamo";
import { redeploy } from "$lib/vercel";

export const POST:RequestHandler = async ({request}) => {
    try{
        const res = (await request.json()) as {datas:DyData[],del:[string, string][]};
        let result = await Dynamo.setAll(res.datas, res.del);
        await redeploy();
        return new Response(JSON.stringify(result));
    } catch(err){
        return new Response(String(err), {
            status:500
        });
    }
}