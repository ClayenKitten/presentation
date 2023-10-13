<script lang="ts">
    import type { Position, Size } from "$lib/util";
    import { createEventDispatcher } from "svelte";
    import Handle from "./Handle.svelte";
    import RotationHandle from "./RotationHandle.svelte";
    import { draggable } from "$lib/draggable";

    export let position: Position;
    export let size: Size;
    export let angle: number;

    const dispatch = createEventDispatcher();

    let cancel_move = false;
    function moved(event: CustomEvent<{ offset: Position }>) {
        if (cancel_move) {
            cancel_move = false;
            return;
        }
        position.x += event.detail.offset.x;
        position.y += event.detail.offset.y;
        position = position;

        dispatch("drag_end");
    }

    function rotated(event: CustomEvent<{ angle: number }>) {
        cancel_move = true;
        angle = event.detail.angle;
        dispatch("drag_end");
    }

    // FIXME: negative resize should flip item.
    function resize(
        event: CustomEvent<{
            offset: { x: number; y: number };
            resize: { x: number; y: number };
        }>
    ) {
        cancel_move = true;
        position.x += event.detail.offset.x;
        position.y += event.detail.offset.y;
        size.w += event.detail.resize.x;
        size.h += event.detail.resize.y;

        position = position;
        size = size;
        dispatch("drag_end");
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="frame" use:draggable on:moved={moved}>
    <RotationHandle on:rotated={rotated} {position} {size} />
    <Handle horizontal="left" vertical="top" on:resized={resize} />
    <Handle horizontal="middle" vertical="top" on:resized={resize} />
    <Handle horizontal="right" vertical="top" on:resized={resize} />
    <Handle horizontal="left" vertical="bottom" on:resized={resize} />
    <Handle horizontal="middle" vertical="bottom" on:resized={resize} />
    <Handle horizontal="right" vertical="bottom" on:resized={resize} />
    <Handle horizontal="left" vertical="middle" on:resized={resize} />
    <Handle horizontal="right" vertical="middle" on:resized={resize} />
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
