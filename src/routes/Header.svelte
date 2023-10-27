<script lang="ts">
    import Icon from "$lib/Components/Util/Icon.svelte";

    let show_search: boolean = false;
    export let search: string;
</script>

<header data-search={show_search}>
    <img src="favicon.png" alt="logo" />
    <input type="search" placeholder="Search..." bind:value={search} />
    <menu>
        <button id="search-button" title="Search" on:click={() => (show_search = !show_search)}>
            {#if !show_search}
                <Icon icon="magnifying-glass" />
            {:else}
                <Icon icon="x" />
            {/if}
        </button>
        <button title="Download archive">
            <Icon icon="download-simple" />
        </button>
        <button title="Settings">
            <Icon icon="gear" />
        </button>
    </menu>
</header>

<style lang="scss">
    @use "sass:math";

    $header-height: 60px;
    $padding: 8px;

    header {
        flex: 0 0 $header-height;
        height: $header-height;
        gap: 0px;
        box-sizing: border-box;

        display: flex;
        background-color: white;
        padding: 0;

        > img {
            width: $header-height;
            height: $header-height;
            margin: 0 10px;
        }
        > input {
            flex: 0 1 500px;
            font-size: 20px;
            padding: 10px 15px;
            border-radius: 5px;
            background-color: #f1f3f4;
            border: none;
            margin: $padding 0;
        }
        > menu {
            flex: 1;
            justify-content: end;
            display: flex;
            margin: 0;
            padding: math.div($padding, 2) $padding;
            gap: 10px;

            > button {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                background-color: white;
                border-radius: 40px;
                border: none;

                height: $header-height - $padding;
                width: $header-height - $padding;
                padding: 0;

                &:hover {
                    background-color: #eee;
                }
            }
        }
    }

    #search-button {
        display: none;
    }
    @media screen and (max-width: 700px) {
        #search-button {
            display: block;
        }
        header:not([data-search="true"]) {
            > input {
                display: none;
            }
            > menu {
                gap: 5px;
            }
        }
        header[data-search="true"] {
            > img {
                display: none;
            }
            > input {
                flex: 1;
                margin-left: $padding;
            }
            > menu {
                flex: 0 1 $header-height - $padding;
                > *:not(#search-button) {
                    display: none;
                }
            }
        }
    }
</style>
