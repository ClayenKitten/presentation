<script lang="ts">
    import type { Slide } from "$lib";
    import { setContext } from "svelte";
    import ObjectDisplay from "./ObjectDisplay.svelte";
    import { writable } from "svelte/store";
    import type { Selection } from "../selection";

    export let slide: Slide;
    export let selection: Selection;

    $: style =
        slide.background instanceof URL
            ? `background-image: url(${slide.background})`
            : `background-color: ${slide.background}`;

    // FIXME: Canvas size should be dynamic
    setContext("canvas_size", writable({ w: 800, h: 450 }));
    
    let drag_just_ended = false;

    function on_selected_object(i: number) {
        if (!selection.selected_object || selection.selected_object[0] != i) {
            selection.select_object(i, slide.objects[i]);
            selection = selection;
        }
    }
    function reset_selection(event: MouseEvent) {
        if (drag_just_ended) {
            drag_just_ended = false;
            return;
        }
        if (selection.selected_object == null) {
            return;
        }
        if (event?.target instanceof Element) {
            if (!event?.target.matches(".object, header *")) {    
                selection.deselect();
                selection = selection;
            }
        }
    }
</script>

<svelte:body on:click={reset_selection}></svelte:body>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<article id="canvas" {style}>
    {#each slide.objects as object, i}
        <ObjectDisplay
            {object}
            on:drag_end = {(_) => drag_just_ended = true}
            on:click = {() => on_selected_object(i)}
            selected = {i === selection.selected_object?.[0]}
        />
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