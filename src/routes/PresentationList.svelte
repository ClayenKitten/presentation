<script lang="ts">
    import type { PresentationInfo } from "$lib";
    import PresentationCard from "./PresentationCard.svelte";

    export let presentations: Record<number, PresentationInfo>;
</script>

<main>
    {#each Object.entries(presentations) as [id, presentation]}
        <PresentationCard {id} {presentation} />
    {/each}
</main>

<style lang="scss">
    main {
        $card-width: 300px;
        $max-cards: 4;
        $gap: 20px;
        $margin: 20px;

        flex: 1;
        align-self: center;
        background-color: white;
        padding: 10px 0;

        width: min(100vw - $margin, $card-width * $max-cards + ($max-cards - 1) * $gap);

        display: grid;
        grid-template-columns: repeat(auto-fill, $card-width);
        justify-content: center;
        align-content: start;
        gap: $gap;
    }
</style>
