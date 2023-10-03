<script lang="ts">
    import type { Slide } from "$lib";
    import ObjectDisplay from "./ObjectDisplay.svelte";

    export let slide: Slide;
    $: style =
        slide.background instanceof URL
            ? `background-image: url(${slide.background})`
            : `background-color: ${slide.background}`;
</script>

<article {style}>
    {#each slide.objects as object}
        <ObjectDisplay {object}/>
    {/each}
</article>

<style lang="scss">
    article {
        aspect-ratio: 16 / 9;
        width: 800px;
        position: relative;
        background-size: 100% 100%;
    }
</style>