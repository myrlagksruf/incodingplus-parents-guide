import { getProject } from "$lib/vercel";
import type { RequestHandler } from "./$types";

export const GET:RequestHandler = async () => {
    try{
        let res = await getProject();
        return new Response(JSON.stringify(res));
    } catch(err){
        return new Response(String(err), {
            status:500
        });
    }
}