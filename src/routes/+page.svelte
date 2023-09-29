<script lang="ts">
    import { DownloadSimple, Gear } from "phosphor-svelte";

    const presentations: Presentation[] = [
        {
            info: {
                name: "Pres1",
                author: "SuperAuthor",
            },
            slides: [],
            styles: {},
        },
        {
            info: {
                name: "Pres2",
                author: "NotSuperAuthor",
            },
            slides: [],
            styles: {},
        },

        {
            info: {
                name: "Pres2",
                author: "NotSuperAuthor",
            },
            slides: [],
            styles: {},
        },
        {
            info: {
                name: "Pres2",
                author: "NotSuperAuthor",
            },
            slides: [],
            styles: {},
        },
        {
            info: {
                name: "Pres2",
                author: "NotSuperAuthor",
            },
            slides: [],
            styles: {},
        },
        {
            info: {
                name: "Pres2",
                author: "NotSuperAuthor",
            },
            slides: [],
            styles: {},
        },
    ]
</script>

<div id="wrapper">
    <header>
        <img src="favicon.png" alt="logo"/>
        <div class="spacer"></div>
        <input type="search"/>
        <menu>
            <button title="Download archive">
                <DownloadSimple size="24px"/>
            </button>
            <button title="Settings">
                <Gear size="24px"/>
            </button>
        </menu>
    </header>
    <main>
        {#each presentations as presentation}
            <div>
                <img/>
                <h2>{presentation.info.name}</h2>
            </div>
        {/each}        
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

        div {
            height: 190px;
            background-color: white;
        }
    }
</style>
