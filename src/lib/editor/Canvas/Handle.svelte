<script lang="ts">
    export let horizontal: "left" | "right" | "middle";
    export let vertical: "top" | "bottom" | "middle";
    import { draggable } from "$lib/draggable";
    import { createEventDispatcher } from "svelte";

    let classes = [
        horizontal == "middle" ? "middle-h" : horizontal,
        vertical == "middle" ? "middle-v" : vertical,
    ].join(" ");

    let dispatch = createEventDispatcher();
    function handle_move(
        event: CustomEvent<{ offset: { x: number; y: number } }>
    ) {
        let offset = structuredClone(event.detail.offset);
        let resize = structuredClone(event.detail.offset);

        switch (horizontal) {
            case "left":
                resize.x *= -1;
                break;
            case "right":
                offset.x = 0;
                break;
            case "middle":
                offset.x = 0;
                resize.x = 0;
                break;
        }
        switch (vertical) {
            case "top":
                resize.y *= -1;
                break;
            case "bottom":
                offset.y = 0;
                break;
            case "middle":
                offset.y = 0;
                resize.y = 0;
                break;
        }

        dispatch("resized", { offset, resize });
    }
</script>

<div class={classes} use:draggable on:moved={handle_move} />

<style lang="scss">
    div {
        position: absolute;
        width: var(--handle-size);
        height: var(--handle-size);
        background-color: blue;
        box-sizing: border-box;
        border: solid 1px white;

        &.middle-h {
            left: calc(50% - var(--handle-size) / 2);
        }
        &.middle-v {
            top: calc(50% - var(--handle-size) / 2);
        }
        &.top {
            top: var(--handle-offset);
        }
        &.bottom {
            bottom: var(--handle-offset);
        }
        &.left {
            left: var(--handle-offset);
        }
        &.right {
            right: var(--handle-offset);
        }

        &.top {
            cursor: n-resize;
        }
        &.bottom {
            cursor: s-resize;
        }
        &.left {
            cursor: w-resize;
        }
        &.right {
            cursor: e-resize;
        }
        &.top.left {
            cursor: nw-resize;
        }
        &.top.right {
            cursor: ne-resize;
        }
        &.bottom.left {
            cursor: sw-resize;
        }
        &.bottom.right {
            cursor: se-resize;
        }
    }
</style>
