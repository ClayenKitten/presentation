<script lang="ts">
    export let slide: Slide;
    $: style = slide.background instanceof URL ? `url(${slide.background})` : slide.background;
</script>

<main>
    <article {style}>
    </article>
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
        }
    }
</style>
