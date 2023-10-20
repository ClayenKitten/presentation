<script lang="ts">
    import { draggable } from "$lib/draggable";
    import type { Position, Size } from "$lib/util";
    import { createEventDispatcher } from "svelte";

    export let position: Position;
    export let size: Size;
    $: center = {
        x: position.x + size.w / 2,
        y: position.y + size.h / 2,
    };

    let canvas_rect = document.getElementById("canvas")?.getBoundingClientRect();
    let dispatch = createEventDispatcher();
    function handle_move(event: CustomEvent<{ position: { x: number; y: number } }>) {
        if (canvas_rect) {
            let position = {
                x: event.detail.position.x - canvas_rect.x,
                y: event.detail.position.y - canvas_rect.y,
            };
            let offset = {
                x: position.x - center.x,
                y: position.y - center.y,
            };
            let angle = Math.atan(offset.y / offset.x);
            if (offset.x > 0) { angle += Math.PI; }
            angle -= Math.PI / 2;
            dispatch("rotated", { angle });
        }
    }
</script>

<div use:draggable on:moved={handle_move} />

<style lang="scss">
    div {
        position: absolute;
        width: var(--handle-size);
        height: var(--handle-size);
        background-color: blue;
        box-sizing: border-box;
        border: solid 1px white;

        left: calc(50% - var(--handle-size) / 2);
        top: calc(-1 * 3 * var(--handle-size));
        border-radius: var(--handle-size);
        cursor: crosshair;
    }
</style>
