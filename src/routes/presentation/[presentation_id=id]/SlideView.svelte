<script lang="ts">
    import type { Slide } from "$lib";
    import Canvas from "$lib/editor/Canvas/Canvas.svelte";
    import type { Selection } from "$lib/editor/selection";

    export let slide: Slide;
    export let selection: Selection;
</script>
<main>
    <Canvas {slide} bind:selection={selection} />
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
