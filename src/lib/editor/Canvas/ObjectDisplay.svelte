<script lang="ts">
    import type { SlideObject } from "$lib/slide_objects";
    import { Image, Video } from "$lib/slide_objects/media";
    import { Textbox } from "$lib/slide_objects/text";
    import type { Position, Size } from "$lib/util";
    import Frame from "./Frame.svelte";
    
    export let object: SlideObject;
    export let selected = false;

    $: left = `${object.position.x}px`;
    $: top = `${object.position.y}px`;
    $: width = `${object.size.w}px`;
    $: height = `${object.size.h}px`;

    function update(event: CustomEvent<[Position, Size]>) {
        object.position = event.detail[0];
        object.size = event.detail[1];
        object = object;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="object"
    tabindex=0
    style:left={left}
    style:top={top}
    style:width={width}
    style:height={height}
    on:click
>
    {#if selected}
        <Frame position={object.position} size={object.size} on:update={update} on:drag_end/>
    {/if}
    {#if object instanceof Textbox}
        <p>{object.text}</p>
    {:else if object instanceof Image}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={object.src.toString()}/>
    {:else if object instanceof Video}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video src={object.src.toString()}/>
    {:else if object instanceof Audio}
        <audio src={object.src.toString()}/>
    {/if}
</div>

<style lang="scss">
    .object {
        position: absolute;
        * {
            width: 100%;
            height: 100%;
            user-select: none;
            pointer-events: none;
        }
    }
</style>
