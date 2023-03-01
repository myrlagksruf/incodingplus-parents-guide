<script lang="ts">
    import { browser } from "$app/environment";
    import type { PageData } from "./$types";
    import datas from '$lib/data.json';
    import { onMount } from "svelte";
    export let data:PageData;
    let del:[string, string][] = [];
    datas.sort((a, b) => a[1].localeCompare(b[1]));
    data.datas.sort((a, b) => {
        let x = data.parse.find(v => v[0] === a.user_id) ?? ['all', '모든 학생'] as string[];
        let y = data.parse.find(v => v[0] === b.user_id) ?? ['all', '모든 학생'] as string[];
        return x[1].localeCompare(y[1])
    });
    let text = '';
    const check = () => setTimeout(async () => {
        if(browser){
            const res = await fetch('/vercel');
            if(res.status === 200){
                let obj = await res.json();
                text = obj.state;
                if(text !== 'READY'){
                    check();
                }
            } else {
                alert(await res.text());
            }
        }
    }, 2000)
    onMount(() => {
        check();
    });
    const add = () => {
        if(!(data.datas.at(-1)?.subject && data.datas.at(-1)?.course && data.datas.at(-1)?.homework)) {
            alert('과목, 코스, 숙제 부분을 채워주세요.');
            return;
        }
        data.datas = [...data.datas, {
            id:'',
            user_id:'all',
            subject:'',
            course:'',
            homework:'',
            view:true,
        }];
    }

    const setAll = async () => {
        if(!browser) return;
        if(!(data.datas.at(-1)?.subject && data.datas.at(-1)?.course && data.datas.at(-1)?.homework)) {
            alert('과목, 코스, 숙제 부분을 채워주세요.');
            return;
        }
        if(text !== 'READY'){
            alert('아직 준비되지 않았습니다.');
            return;
        }
        try{
            text = 'QUEUED';
            const res = await fetch(location.href, {
                method:'POST',
                body:JSON.stringify({
                    datas:data.datas,
                    del
                })
            })
            location.reload();
        } catch(err){
            alert(String(err));
        }
    }
</script>
<h1>{text}</h1>
<select on:input={e => {
    if(!browser) return;
    window.open(e.currentTarget.value, '_blank');
    e.currentTarget.value = ''
}}>
    <option value="" hidden>학생을 골라주세요</option>
    {#each datas as [id, name]}
        <option value="/{id}">{name}</option>
    {/each}
</select>
<table>
    <tbody>
        <tr>
            <th>학생 이름</th>
            <th>과목</th>
            <th>코스</th>
            <th>숙제</th>
            <th>보기</th>
            <th>삭제</th>
        </tr>
        {#each data.datas as info,ind (info)}
           <tr data-id={info.id} class={del.find(v => v[0] === info.id) ? 'yes' : 'no'}>
                <td>
                    <select disabled={!!info.id} bind:value={info.user_id}>
                        <option value="all">모든 학생</option>
                        {#each data.parse as v}
                            <option value={v[0]}>{v[1]}</option>
                        {/each}
                    </select>
                </td>
                <td><input type="text" bind:value={info.subject}></td>
                <td><input type="text" bind:value={info.course}></td>
                <td><input type="text" bind:value={info.homework}></td>
                <td><input type="checkbox" bind:checked={info.view}></td>
                <td>
                    <button
                        on:click={e => {
                            if(!info.id){
                                data.datas = [...data.datas.slice(0, ind), ...data.datas.slice(ind + 1)];
                                return;
                            }
                            let ind2 = del.findIndex(v => v[0] === info.id)
                            if(ind2 !== -1){
                                del = [...del.slice(0, ind2), ...del.slice(ind2 + 1)];
                            } else {
                                del = [...del, [info.id, info.user_id]];
                            }
                        }}
                    ></button>
                </td>
           </tr> 
        {/each}
        <tr class="button">
            <td colspan="6"><button on:click={add}>추가</button></td>
        </tr>
        <tr class="button">
            <td colspan="6"><button disabled={text !== 'READY'} on:click={setAll}>적용</button></td>
        </tr>
    </tbody>
</table>
<style lang="scss">
    h1{
        margin-top: 0;
    }
    table{
        table-layout: fixed;
        border-collapse: collapse;
        tr{
            td, th{
                text-align: center;
                input{
                    width:100%;
                    box-sizing: border-box;
                    outline: none;
                }
                &:nth-child(1){
                    width:85px;
                }
                &:nth-child(n + 2){
                    width:calc((100% - 155px) / 3);
                }
                &:nth-child(n + 5){
                    width:35px;
                }
            }
            &.button{
                button{
                    box-sizing: border-box;
                    width:100%;
                    height: 100%;
                }
            }
            &.yes{
                background-color: rgba(255, 0, 0, 0.2);
                button::before{
                    content:"✓";
                    color:green;
                }
            }
            &.no{
                button::before{
                    content:"✕";
                    color:red;
                }
            }
        }
    }
</style>