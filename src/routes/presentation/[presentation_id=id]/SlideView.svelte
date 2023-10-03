<script lang="ts">
    import type { Slide } from "$lib";
    import Canvas from "$lib/editor/Canvas/Canvas.svelte";

    export let slide: Slide;
</script>
<main>
    <Canvas {slide} />
</main>

<style lang="scss">
    main {
        grid-area: main;
        background-color: black;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
