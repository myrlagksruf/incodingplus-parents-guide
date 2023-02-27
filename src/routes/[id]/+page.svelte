<script lang="ts">
    import type { PageData } from "./$types";

    export let data:PageData
    console.log(data.info);
</script>

{#each data.info as info}
    {info.아이디}<br>
    {info.학생이름}<br>
    {info.수업명}<br>
    {info.과목}<br>
{/each}