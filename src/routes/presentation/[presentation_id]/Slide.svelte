<script lang="ts">
    export let slide: Slide;
</script>

<main>
    <article style="background-color: {slide.background};">
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
