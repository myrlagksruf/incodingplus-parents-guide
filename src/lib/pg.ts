import pg from 'pg';
import type { PoolClient } from 'pg'

const pool = new pg.Pool({
    user:import.meta.env.VITE_DB_USER ?? process.env.VITE_DB_USER,
    password:import.meta.env.VITE_DB_PASS ?? process.env.VITE_DB_PASS,
    host:import.meta.env.VITE_DB_HOST ?? process.env.VITE_DB_HOST,
    database:import.meta.env.VITE_DB_BASE ?? process.env.VITE_DB_BASE,
    port:Number(import.meta.env.VITE_DB_PORT ?? process.env.VITE_DB_PORT),
});


export const getInfo = async (id:string):Promise<{
    status:true;
    res:pg.QueryResult<{
        아이디: string;
        학생이름: string;
        수업명: string;
        과목: string;
    }>
}|{
    status:false;
    reason:string;
}> => {
    let client:PoolClient|null = null;
    try{
        client = await pool.connect();
        /** @type {import('pg').QueryResult<{id:string}>} */
        const res = await client.query<{
            아이디:string;
            학생이름:string;
            수업명:string;
            과목:string;
        }>(`
        select
            ss2.id as 아이디,
            ss2.name as 학생이름,
            sc2.name as 수업명,
            sc2.category as 과목
        from (
            select
                ss.user_id as ud,
                sc.root_id as rd,
                max(sc.last_modified) as md
            from svc_submit ss
            join svc_course_material scm
                on scm.id = ss.material_id
            join svc_course sc
                on scm.root_id = any(sc.material_ids)
            where ss.registered_at > '2023-02-01 00:00:00'
            group by ss.user_id, sc.root_id
        ) as tt
        join svc_course sc2 on
            tt.rd = sc2.root_id and tt.md = sc2.last_modified
        join svc_student ss2 on
            ss2.id = tt.ud and ss2.status = '재원'
        where
            sc2.name like '[%' and ss2.id='${id}'
        order by sc2.registered_at asc
        `);
        return {
            status:true,
            res
        }
    } catch(err){
        if(client) client.release();
        console.log(err);
        return {
            status:false,
            reason:String(err),
        }
    }
}