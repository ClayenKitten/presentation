<script lang="ts">
    import type { Presentation } from "$lib";
    import Icon from "$lib/Components/Util/Icon.svelte";
    import type { Selection } from "$lib/Components/Editor/Canvas/selection";
    import SideBarPreview from "./SideBarEntry.svelte";

    export let presentation: Presentation;

    export let current_slide: number;
    export let selection: Selection;

    export let collapsed: boolean;
</script>

<aside>
    <ol class:collapsed={collapsed}>
        {#each presentation.slides as _, i}
            <SideBarPreview
                {i}
                slide={presentation.slides[i]}
                bind:current_slide={current_slide}
                {selection}
            />
        {/each}
    </ol>
    <menu>
        <button title="Grid view">
            <Icon icon="grid-four"/>
        </button>
        <button on:click={() => { collapsed = !collapsed; }} title="Hide slide list">
            {#if collapsed}
                <Icon icon="arrow-right"/>
            {:else}
                <Icon icon="arrow-left"/>
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
                font-size: 20px;

                &:hover {
                    background-color: #eee;
                }
            }
        }
    }
</style>
