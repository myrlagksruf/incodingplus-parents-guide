<script lang="ts">
    import { parse, OrderClass } from "$lib/parse";
    import { name } from "$lib/store";
    import type { PageData } from "./$types";

    export let data:PageData;
    const map:{[key:string]:{[key:string]:string[]}} = {};
    $name = `${(data.info[0].학생이름 ?? '').match(/^[가-힣]+/)?.[0]} 학생` ?? '';
    for(let i of data.info){
        const arr = parse(i);
        let check = data.datas.find(v => 
            v.subject === arr[0] &&
            v.course === arr[1] &&
            v.homework === arr[2]);
        if(check && !check.view) continue;
        if(!map[arr[0]]){
            map[arr[0]] = {};
        }
        if(!map[arr[0]][arr[1]]){
            map[arr[0]][arr[1]] = [];
        }
        if(map[arr[0]][arr[1]].indexOf(arr[2]) === -1){
            map[arr[0]][arr[1]].push(arr[2]);
        }
    }
    for(let i of data.datas ?? []){
        if(!i.view) continue;
        if(!map[i.subject]){
            map[i.subject] = {};
        }
        if(!map[i.subject][i.course]){
            map[i.subject][i.course] = [];
        }
        if(map[i.subject][i.course].indexOf(i.homework) === -1){
            map[i.subject][i.course].push(i.homework);
        }
    }
    for(let values of Object.values(map)){
        for(let v of Object.values(values)){
            v.sort((a, b) => a.localeCompare(b));
        }
    }
</script>
<main>
    <div class="grid">
        <div class="title">수업 현황</div>
        {#each Object.entries(map).sort((a, b) => OrderClass.getSubjectOrder(a[0]) - OrderClass.getSubjectOrder(b[0])) as [과목명, 과목]}
            <div class="subject" style="grid-row:span {Object.values(과목).reduce((a, v) => a + v.length + 1, -1)}">
                {@html 과목명}
            </div>
            {#each Object.entries(과목).sort((a, b) => {
                let indexA = OrderClass.getCourseOrder(a[0]);
                let indexB = OrderClass.getCourseOrder(b[0]);
                if(isFinite(indexA) && isFinite(indexB)){
                    return indexA - indexB
                }
                return a[0].localeCompare(b[0]);
            }) as [수업명, 숙제들]}
                <div class="course" style="grid-row:span {숙제들.length}">
                    {@html 수업명}
                </div>
                {#each 숙제들 as 숙제}
                    <div class="homework">{@html 숙제}</div>
                {/each}
                <div class="last"></div>
            {/each}
        {/each}
    </div>
</main>
<style lang="scss">
    .grid{
        display: grid;
        padding:0 15px;
        gap:10px 15px;
        grid-template-columns: 1fr 2fr 4fr;
        .title{
            grid-column: span 3;
            font-size:2em;
            padding-bottom: 1em;
            user-select: none;
        }
        .subject{
            font-size: 1.25em;
        }
        .course{
            font-size: 1.05em;
            color:rgb(100, 100, 100);
        }
        .homework{
            font-size: 0.9em;
            color:rgb(100, 130, 150);
        }
        .last{
            grid-column: span 2;
            &:has(+ .subject){
                grid-column: span 3;
                margin: 1.5em 0;
                border-bottom: 3px solid #ddd;
            }
            &:last-child{
                grid-column: span 3;
                margin-bottom: 3em;
            }
        }
    }
</style>