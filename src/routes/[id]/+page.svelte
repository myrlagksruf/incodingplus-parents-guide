<script lang="ts">
    import type { PageData } from "./$types";

    export let data:PageData
    const map:{[key:string]:{[key:string]:string[]}} = {
    };

    const error:typeof data['info'] = [];

    for(let i of data.info){
        if(!map[i.과목]){
            map[i.과목] = {};
        }
        let subject = i.숙제명.match(/\([가-힣]+\)\s*\[([\d\.가-힣]+)\]\s*/);
        if(!subject){
            error.push(i);
            continue;
        }
        let raw = i.숙제명.replace(subject[0], '');
        if(!map[i.과목][subject[1]]){
            map[i.과목][subject[1]] = [];
        }
        const arr = map[i.과목][subject[1]];
        if(arr.includes())
    }
</script>

{#each data.info as info}
    {info.아이디}<br>
    {info.학생이름}<br>
    {info.수업명}<br>
    {info.과목}<br>
{/each}