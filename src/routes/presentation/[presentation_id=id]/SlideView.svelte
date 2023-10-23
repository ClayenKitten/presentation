<script lang="ts">
    import type { Slide } from "$lib";
    import Canvas from "$lib/Components/Editor/Canvas/Canvas.svelte";
    import type { Selection } from "$lib/Components/Editor/Canvas/selection";

    export let slide: Slide;
    export let selection: Selection;
</script>
<main>
    <Canvas {slide} {selection} />
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
