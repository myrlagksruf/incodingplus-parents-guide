import type { PageServerLoad } from "./$types";
import { Dynamo } from '$lib/dynamo';

export const load:PageServerLoad = async () => {
    const datas = await Dynamo.getAll();
    return {
        datas
    }
}