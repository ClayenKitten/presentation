<script lang="ts">
    import type { Position, Size } from "$lib/util";
    import { createEventDispatcher, getContext } from "svelte";
    import type { Readable } from "svelte/motion";

    let canvas_size: Readable<Size> = getContext("canvas_size");

    export let position: Position;
    export let size: Size;
    const dispatch = createEventDispatcher();
    
    let dragged = false;
    function drag(e: MouseEvent) {
        if (dragged) {
            position.x += e.movementX;
            position.y += e.movementY;
            if (position.x < 0) {
                position.x = 0;
            } else if (position.x + size.w > $canvas_size.w) {
                position.x = $canvas_size.w - size.w;
            }

            if (position.y < 0) {
                position.y = 0;
            } else if (position.y + size.h > $canvas_size.h) {
                position.y = $canvas_size.h - size.h;
            }
        }
    }
    function end() {
        if (dragged) {
            dragged = false;
            dispatch("update", [position, size]);
            dispatch("drag_end");
        }
    }
</script>

<svelte:window on:mouseup={end} on:mousemove={drag} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="frame" on:mousedown={() => dragged = true}>
    <div class="top left size handle"></div>
    <div class="top middle-w size handle"></div>
    <div class="top right size handle"></div>
    <div class="middle-h right size handle"></div>
    <div class="bottom right size handle"></div>
    <div class="bottom middle-w size handle"></div>
    <div class="bottom left size handle"></div>
    <div class="middle-h left size handle"></div>
    <div class="rotation handle"></div>
</div>

<style lang="scss">
    @use 'sass:math';

    $size: 14px;
    $offset: math.div(-$size, 2);
    .frame {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: var(--frame-z-index);
        box-sizing: border-box;
        border: {
            width: 2px;
            style: dashed;
            color: rgba(255, 255, 255, 0.75);
        }
        cursor: move;

        .handle {
            position: absolute;
            width: $size;
            height: $size;
            background-color: blue;
            box-sizing: border-box;
            border: solid 1px white;

            &.rotation {
                right: 50%;
                left: 50%;
                top: -1*3*$size;
                border-radius: $size;
                cursor: crosshair;
            }
            &.size {
                &.middle-w {
                    left: 50%;
                    right: 50%;
                }
                &.middle-h {
                    top: 50%;
                    bottom: 50%;
                }
                &.top { top: $offset; }
                &.bottom { bottom: $offset }
                &.left { left: $offset }
                &.right { right: $offset }

                &.top { cursor: n-resize; }
                &.bottom { cursor: s-resize; }
                &.left { cursor: w-resize; }
                &.right { cursor: e-resize; }
                &.top.left { cursor: nw-resize; }
                &.top.right { cursor: ne-resize; }
                &.bottom.left { cursor: sw-resize; }
                &.bottom.right { cursor: se-resize; }
            }
        }
    }
</style>
