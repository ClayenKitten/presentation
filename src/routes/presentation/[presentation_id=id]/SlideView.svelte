<script lang="ts">
    import type { Slide } from "$lib";

    export let slide: Slide;
    $: style =
        slide.background instanceof URL
            ? `background-image: url(${slide.background})`
            : `background-color: ${slide.background}`;
</script>

<main>
    <article {style} />
</main>

<style lang="scss">
    main {
        grid-area: main;
        background-color: black;

        display: flex;
        justify-content: center;
        align-items: center;

        > article {
            aspect-ratio: 16 / 9;
            width: 800px;
            position: relative;
            background-size: 100% 100%;
        }
    }
</style>
