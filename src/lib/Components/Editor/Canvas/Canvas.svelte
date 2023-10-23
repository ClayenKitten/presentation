<script lang="ts">
    import type { Slide } from "$lib";
    import ObjectDisplay from "./ObjectDisplay.svelte";
    import type { Selection } from "$lib/Components/Editor/Canvas/selection";
    import Frame from "./Frame.svelte";

    export let slide: Slide;
    export let selection: Selection;

    let drag_just_ended = false;
    $: style = slide.background.startsWith("url")
        ? `background-image: ${slide.background}`
        : `background-color: ${slide.background}`;
    $: selected_object = $selection.selected_object;

    function on_selected_object(i: number) {
        if (!selected_object || selected_object[0] != i) {
            selection.select_object(i, slide.objects[i]);
        }
    }
    function reset_selection(event: MouseEvent) {
        if (drag_just_ended) {
            drag_just_ended = false;
            return;
        }
        if (!selected_object) {
            return;
        }
        if (event?.target instanceof Element) {
            if (!event?.target.matches(".object, header *")) {
                selection.deselect();
            }
        }
    }

    $: if (drag_just_ended) { slide = slide; }
</script>

<svelte:body on:click={reset_selection} />

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<article id="canvas" {style}>
    {#if selected_object}
        <Frame bind:object={selected_object[1]} on:drag_end={(_) => (drag_just_ended = true)} />
    {/if}
    {#each slide.objects as object, i}
        <ObjectDisplay {object} on:click={() => on_selected_object(i)} />
    {/each}
</article>

<style lang="scss">
    article {
        aspect-ratio: 16 / 9;
        width: 800px;
        position: relative;
        background-size: 100% 100%;
    }
</style>
