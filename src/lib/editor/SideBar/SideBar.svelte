<script lang="ts">
    import type { Presentation } from "$lib";
    import SideBarPreview from "./SideBarEntry.svelte";

    export let slide_number: number;
    export let presentation: Presentation;

    export let collapsed: boolean;
</script>

<aside>
    <ol class:collapsed={collapsed}>
        {#each presentation.slides as _, i}
            <SideBarPreview slide={presentation.slides[i]} bind:slide_number={slide_number} {i}/>
        {/each}
    </ol>
    <menu>
        <button title="Grid view">
            <i class="ph-bold ph-grid-four"></i>
        </button>
        <button on:click={() => { collapsed = !collapsed; }} title="Hide slide list">
            {#if collapsed}
                <i class="ph-bold ph-arrow-right"></i>
            {:else}
                <i class="ph-bold ph-arrow-left"></i>
            {/if}
        </button>
    </menu>
</aside>

<style lang="scss">
    aside {
        grid-area: side;
        background-color: white;

        display: flex;
        flex-direction: column;

        ol {
            --spacing: 16px;
            width: 220px;

            flex: 1;
            overflow-y: scroll;
            list-style: none;

            display: flex;
            flex-direction: column;

            margin: 0;
            padding: var(--spacing);
            gap: var(--spacing);

            &.collapsed {
                display: none;
            }
        }

        menu {
            display: flex;
            gap: 10px;
            padding: 10px;

            height: 40px;
            margin: 0;

            > button {
                display: flex;
                align-items: center;
                justify-content: center;

                height: 40px;
                width: 40px;
                border-radius: 40px;

                background-color: white;
                border: none;

                &:hover {
                    background-color: #eee;
                }

                > i {
                    font-size: 20px;
                }
            }
        }
    }
</style>
