<script lang="ts">
    import type { PageData } from "./$types";
    import PresentationList from "./PresentationList.svelte";
    import Header from "./Header.svelte";

    export let data: PageData;

    let search: string;
</script>

<div id="wrapper">
    <Header bind:search />
    {#await data.presentations.inner}
        <main>
            <p>Loading...</p>
        </main>
    {:then presentations}
        <PresentationList {presentations} />
    {/await}
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
        margin: 0;
    }
</style>
