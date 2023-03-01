import { Dynamo } from "$lib/dynamo";
import { getInfo } from "$lib/pg";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({params}) => {
    try{
        let info = await getInfo(params.id);
        const datas = await Dynamo.getAll(params.id);
        if(info.status){
            return {
                info:info.res.rows,
                datas,
            }
        }
    } catch(err){
        console.log(err);
    }
    return {
        info:[],
        datas:[]
    };
}