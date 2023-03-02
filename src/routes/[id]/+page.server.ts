import { Dynamo } from "$lib/dynamo";
import { getComment, getInfo } from "$lib/pg";
import type { PageServerLoad } from "./$types";
export const prerender = true;
export const load:PageServerLoad = async ({params, parent}) => {
    try{
        let layout = await parent();
        let info = await getInfo(params.id);
        let comment = await getComment(params.id, layout.month + 1);
        const datas = await Dynamo.getAll(params.id);
        if(info.status && comment.status){
            console.log(info.res.rows[0].학생이름);
            return {
                info:info.res.rows,
                datas,
                comment:comment.res.rows
            }
        }
    } catch(err){
        console.log(err);
    }
    return {
        info:[],
        datas:[],
        comment:[]
    };
}