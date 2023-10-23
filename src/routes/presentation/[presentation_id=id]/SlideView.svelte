<script lang="ts">
    import type { SlideStore } from "$lib/stores/slide";
    import Canvas from "$lib/Components/Editor/Canvas/Canvas.svelte";
    import type { SelectionStore } from "$lib/stores/selection";

    export let slide: SlideStore;
    export let selection: SelectionStore;
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
