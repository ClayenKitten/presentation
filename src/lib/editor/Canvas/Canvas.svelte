<script lang="ts">
    import type { Slide } from "$lib";
    import { setContext } from "svelte";
    import ObjectDisplay from "./ObjectDisplay.svelte";
    import { writable } from "svelte/store";

    export let slide: Slide;
    $: style =
        slide.background instanceof URL
            ? `background-image: url(${slide.background})`
            : `background-color: ${slide.background}`;

    // FIXME: Canvas size should be dynamic
    setContext("canvas_size", writable({ w: 800, h: 450 }));

    let selected_object_index: number | null = null;
    $: selected_object = selected_object_index
        ? slide.objects[selected_object_index]
        : null;
    
    let drag_just_ended = false;

    function on_selected_object(i: number) {
        if (selected_object_index != i) {
            selected_object_index = i;
        }
    }
    function reset_focus(event: MouseEvent) {
        let data = document.querySelectorAll(".object");

        if (drag_just_ended) {
            drag_just_ended = false;
            return;
        }
        if (selected_object_index == null) {
            return;
        }
        if (event?.target instanceof Element) {
            let target = event?.target;
            for (let index = 0; index < data.length; index++) {
                if (data[index] == target) {
                    return;
                }
            }
            selected_object_index = null;
        }
    }
</script>

<svelte:body on:click={reset_focus}></svelte:body>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<article id="canvas" {style}>
    {#each slide.objects as object, i}
        <ObjectDisplay
            {object}
            on:drag_end = {(_) => drag_just_ended = true}
            on:click = {() => on_selected_object(i)}
            selected = {i === selected_object_index}
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