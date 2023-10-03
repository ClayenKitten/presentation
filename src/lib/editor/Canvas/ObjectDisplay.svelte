<script lang="ts">
    import type { SlideObject } from "$lib/slide_objects";
    import { Image, Video } from "$lib/slide_objects/media";
    import { Textbox } from "$lib/slide_objects/text";
    
    export let object: SlideObject;

    $: left = `${object.position.x}px`;
    $: top = `${object.position.y}px`;
    $: width = `${object.size.w}px`;
    $: height = `${object.size.h}px`;

</script>

<div class="object"
    style:left={left}
    style:top={top}
    style:width={width}
    style:height={height}
>
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
        :global(*) {
            height: 100%;
            width: 100%;
        }
    }
</style>
