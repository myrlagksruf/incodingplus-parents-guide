<script lang="ts">
    import type { LayoutData } from './$types';
    import { name } from '$lib/store';

    export let data:LayoutData;
</script>
<main>
    <div class="title">
        <h2>{String(data.year).slice(2)}년 {String(data.month + 1).padStart(2, '0')}월</h2>
        <h1>학부모 안내서</h1>
        <h2 class="name">{$name}</h2>
    </div>
    <div class="logo-container">
        <div class="logo"></div>
        <div class="logo-title">인코딩플러스<br>Incoding Plus</div>
    </div>
    <slot />
</main>
<style lang="scss">
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        height: 100vh;
        .title{
            padding-top:4em;
            padding-bottom:5em;
            display: inline-block;
            user-select: none;
            .name{
                padding-top:0.3em;
            }
        }
        .logo-container{
            display: flex;
            align-items: center;
            margin-bottom: 5em;
            .logo{
                display: inline-block;
                width:10em;
                height: 10em;
                background-image: url("/svelte-logo.svg");
                background-repeat: no-repeat;
                background-position: center;
            }
            .logo-title{
                font-size:2em;
                font-weight: 900;
                user-select: none;
                color:rgb(75, 130, 195);
            }
        }
        width: 100%;
        box-sizing: border-box;
        max-width: 1000px;
        margin:auto;
        background-color: white;
        h1{
            margin:0;
            font-size:4rem;
        }
        h2{
            margin:0;
            font-size:2.5rem;
        }
    }
</style>