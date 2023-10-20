<script lang="ts">
    import { SlideObject, Image, Video, Textbox } from "$lib/Components/Editor/Canvas/slide_objects";

    export let object: SlideObject;

    $: left = `${object.position.x}px`;
    $: top = `${object.position.y}px`;
    $: width = `${object.size.w}px`;
    $: height = `${object.size.h}px`;
    $: transform = `rotate(${object.angle}rad)`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="object"
    tabindex="0"
    style:left
    style:top
    style:width
    style:height
    style:transform
    on:click
>
    {#if object instanceof Textbox}
        <p>{object.text}</p>
    {:else if object instanceof Image}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={object.src.toString()} />
    {:else if object instanceof Video}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video src={object.src.toString()} />
    {:else if object instanceof Audio}
        <audio src={object.src.toString()} />
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
