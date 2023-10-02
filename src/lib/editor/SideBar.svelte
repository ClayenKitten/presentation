<script lang="ts">
    import type { Presentation } from "$lib";
    import SideBarPreview from "./SideBar/SideBarEntry.svelte";

    export let slide_number: number;
    export let presentation: Presentation;
</script>

<aside>
    <ol id="slide-list">
        {#each presentation.slides as _, i}
            <SideBarPreview slide={presentation.slides[i]} bind:slide_number={slide_number} {i}/>
        {/each}
    </ol>
    <menu>
        <button title="Grid view">
            <i class="ph-bold ph-grid-four"></i>
        </button>
        <button title="Hide slide list">
            <i class="ph-bold ph-arrow-left"></i>
        </button>
    </menu>
</aside>

<style lang="scss">
    aside {
        grid-area: side;
        background-color: white;

        display: flex;
        flex-direction: column;

        #slide-list {
            --spacing: 16px;

            flex: 1;
            overflow-y: scroll;
            list-style: none;

            display: flex;
            flex-direction: column;

            margin: 0;
            padding: var(--spacing);
            gap: var(--spacing);
        }

        menu {
            display: flex;
            gap: 10px;
            padding: 10px;

            height: 40px;
            margin: 0;
            background-color: gray;

            > button {
                height: 40px;
                width: 40px;
                border: solid gray 1px;
            }
        }
    }
</style>
