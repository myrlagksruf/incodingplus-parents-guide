<script lang="ts">
    import { browser } from "$app/environment";
    import type { PageData } from "./$types";
    export let data:PageData;
    let del:[string, string][] = [];
    data.datas.sort((a, b) => {
        let x = data.parse.find(v => v[0] === a.user_id) as string[];
        let y = data.parse.find(v => v[0] === b.user_id) as string[];
        return x[1].localeCompare(y[1])
    });
    const add = () => {
        if(data.datas.some(v => v.user_id === 'default')) return;
        data.datas = [...data.datas, {
            id:'',
            user_id:'default',
            subject:'',
            course:'',
            homework:'',
            view:true,
        }];
    }

    const setAll = async () => {
        if(data.datas.some(v => v.user_id === 'default')) return;
        try{
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
<table>
    <tbody>
        {#each data.datas as info,ind}
           <tr data-id={info.id} class={del.find(v => v[0] === info.id) ? 'yes' : 'no'}>
                <td>
                    <select bind:value={info.user_id}>
                        <option value="default" hidden>이름을 선택해주세요</option>
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
                            if(del.find(v => v[0] === info.id)){
                                del = [...del.slice(0, ind), ...del.slice(ind + 1)];
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
            <td colspan="6"><button on:click={setAll}>적용</button></td>
        </tr>
    </tbody>
</table>
<style lang="scss">
    table{
        border-collapse: collapse;
        tr{
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