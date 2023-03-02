import { Dynamo } from "$lib/dynamo";
import { getComment, getInfo } from "$lib/pg";
import type { LayoutServerLoad } from "./$types";
import data from '$lib/data.json';
export const prerender = true;
export const load:LayoutServerLoad = async ({params, parent}) => {
    try{
        let layout = await parent();
        let info = await getInfo(params.id);
        let comment = await getComment(params.id, layout.month + 1);
        const datas = await Dynamo.getAll(params.id);
        if(info.status && comment.status){
            let names = data.find(v => v[0] === params.id) as string[];
            console.log(names);
            return {
                info:info.res.rows,
                datas,
                comment:comment.res.rows,
                id:names[0] ?? '',
                name:names[1] ?? ''
            }
        }
    } catch(err){
        console.log(err);
    }
    return {
        info:[],
        datas:[],
        comment:[],
        id:'',
        name:'',
    };
}