<script lang="ts">
    import { parse, OrderClass } from "$lib/parse";
    import type { PageData } from "./$types";

    export let data:PageData
    const map:{[key:string]:{[key:string]:string[]}} = {};


    for(let i of data.info){
        const arr = parse(i);
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
    for(let values of Object.values(map)){
        for(let v of Object.values(values)){
            v.sort((a, b) => a.localeCompare(b));
        }
    }
</script>
<main>
    <h3>수업 현황</h3>
    <div class="grid">
        {#each Object.entries(map).sort((a, b) => OrderClass.getSubjectOrder(a[0]) - OrderClass.getSubjectOrder(b[0])) as [과목명, 과목]}
            <div class="subject" style="grid-row:span {Object.values(과목).reduce((a, v) => a + v.length, 0)}">
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
            {/each}
        {/each}
    </div>
</main>
<style lang="scss">
    h3{
        font-size:2em;
        padding-left: 2em;
    }
    .grid{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        .subject{
            font-size: 1.75em;
            text-align: center;
        }
        .course{
            font-size: 1.25em;
        }
        .homework{
            font-size: 1em;
        }
    }
</style>