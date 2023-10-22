<script lang="ts">
    import type { SlideObject } from "$lib/Components/Editor/Canvas/slide_objects";

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
    {#if object.kind == "textbox"}
        <p>{object.text}</p>
    {:else if object.kind == "image"}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={object.src.toString()} />
    {:else if object.kind == "video"}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video src={object.src.toString()} />
    {:else if object.kind == "audio"}
        <audio src={object.src.toString()} />
    {:else if object.kind == "shape"}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {#if object.shape == "rect"}
                <rect x="0" y="0" width="100" height="100" />
            {:else if object.shape == "oval"}
                <ellipse cx="50" cy="50" rx="50" ry="50" />
            {/if}
        </svg>
    {:else if object.kind == "qrcode"}
        <a href={object.src}>qr-code</a>
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
