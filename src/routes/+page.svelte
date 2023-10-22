<script lang="ts">
    import Icon from "$lib/Components/Util/Icon.svelte";
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div id="wrapper">
    <header>
        <img src="favicon.png" alt="logo"/>
        <div class="spacer"></div>
        <input type="search"/>
        <menu>
            <button title="Download archive">
                <Icon icon="download-simple"/>
            </button>
            <button title="Settings">
                <Icon icon="gear"/>
            </button>
        </menu>
    </header>
    <main>
        {#await data.presentations.inner}
            <p>Loading...</p>
        {:then presentations}
            {#each Object.entries(presentations) as [id, presentation]}
                <a class="entry" href="/presentation/{id}">
                    <img/>
                    <h2>{presentation.name}</h2>
                </a>
            {/each}
        {/await}
    </main>
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
        margin: 0;
    }

    header {
        --header-height: 60px;

        display: flex;
        flex: 0 0 var(--header-height);
        background-color: red;

        > img {
            width: var(--header-height);
        }
        > .spacer {
            width: calc(25vw - var(--header-height));
        }
        > input {
            width: 50vw;
            margin: 10px 0;
            border-radius: 5px;
        }
        > menu {
            display: flex;
            justify-content: end;
            gap: 10px;
            padding: 10px;

            width: 25vw;
            margin: 0;

            > button {
                aspect-ratio: 1;
            }
        }
    }

    main {
        flex: 1;
        background-color: gray;

        padding: 0 calc((100vw - min(1000px, 100vw)) / 2);
        
        display: grid;
        grid-template-columns: repeat(auto-fit, 208px);;
        justify-content: center;
        align-content: start;
        gap: 10px;

        .entry {
            height: 190px;
            background-color: white;
        }
    }
</style>
