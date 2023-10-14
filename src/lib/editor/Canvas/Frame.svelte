<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Handle from "./Handle.svelte";
    import RotationHandle from "./RotationHandle.svelte";
    import { draggable } from "$lib/draggable";
    import type { SlideObject } from "$lib/slide_objects";

    export let object: SlideObject;

    const dispatch = createEventDispatcher();

    let cancel_move = false;
    function moved(event: CustomEvent<{ offset: { x: number; y: number } }>) {
        if (cancel_move) {
            cancel_move = false;
            return;
        }
        object.position.x += event.detail.offset.x;
        object.position.y += event.detail.offset.y;
        object = object;
        dispatch("drag_end");
    }

    function rotated(event: CustomEvent<{ angle: number }>) {
        cancel_move = true;
        object.angle = event.detail.angle;
        object = object;
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
        object.position.x += event.detail.offset.x;
        object.position.y += event.detail.offset.y;
        object.size.w += event.detail.resize.x;
        object.size.h += event.detail.resize.y;

        object = object;
        dispatch("drag_end");
    }

    $: left = `${object.position.x}px`;
    $: top = `${object.position.y}px`;
    $: width = `${object.size.w}px`;
    $: height = `${object.size.h}px`;
    $: transform = `rotate(${object.angle}rad)`;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="frame"
    use:draggable
    on:moved={moved}
    style:left
    style:top
    style:width
    style:height
    style:transform
>
    <RotationHandle
        on:rotated={rotated}
        position={object.position}
        size={object.size}
    />
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
