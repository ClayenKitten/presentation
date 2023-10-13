<script lang="ts">
    import type { Position, Size } from "$lib/util";
    import { createEventDispatcher, getContext } from "svelte";
    import type { Readable } from "svelte/motion";
    import Handle from "./Handle.svelte";
    import RotationHandle from "./RotationHandle.svelte";

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
<div class="frame" on:mousedown={() => (dragged = true)}>
    <RotationHandle />
    <Handle horizontal="left" vertical="top" />
    <Handle horizontal="middle" vertical="top" />
    <Handle horizontal="right" vertical="top" />
    <Handle horizontal="left" vertical="bottom" />
    <Handle horizontal="middle" vertical="bottom" />
    <Handle horizontal="right" vertical="bottom" />
    <Handle horizontal="left" vertical="middle" />
    <Handle horizontal="right" vertical="middle" />
</div>

<style lang="scss">
    .frame {
        --handle-size: 14px;
        --handle-offset: calc(-1 * var(--handle-size) / 2);

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
    }
</style>
