<script lang="ts">
    import Icon from "$lib/Components/Util/Icon.svelte";
    import MenuBar from "$lib/Components/Editor/Header/MenuBar/MenuBar.svelte";
    import ToolBar from "$lib/Components/Editor/Header/ToolBar/ToolBar.svelte";
    import i18n from "$lib/translation";

    export let title: String;
</script>

<header>
    <a id="home" href="/" title="Home">
        <img src="/favicon.png" alt="home"/>
    </a>
    <menu id="titlebar">
        <h1 id="title">{title}</h1>
    </menu>
    <menu id="controls">
        <button>{i18n("slideshow")}</button>
        <button>
            <Icon icon="lock"/>
            {i18n("access")}
        </button>
    </menu>
    <MenuBar on:action/>
    <ToolBar/>
</header>

<style lang="scss">
    header {
        --titlebar-height: 30px;
        --menubar-height: 30px;
        --toolbar-height: 50px;

        grid-area: head;

        display: grid;
        grid-template-rows: var(--titlebar-height) var(--menubar-height) var(--toolbar-height);
        grid-template-columns: 60px 1fr;
        grid-template-areas:
            "home    titlebar controls"
            "home    menubar  controls"
            "toolbar toolbar  toolbar";

        > a#home {
            grid-area: home;
            background-color: white;
            img {
                width: 60px;
            }
        }
        > menu {
            display: block;
            margin: 0;
            padding: 0;
            &#titlebar {
                grid-area: titlebar;

                display: flex;
                align-items: center;

                padding: 0 10px;
                gap: 10px;

                h1 {
                    margin: 0;
                    font-size: 14pt;
                    font-family: sans-serif;
                }
            }
            &#controls {
                grid-area: controls;
                display: flex;
                padding: 10px;
                gap: 10px;
                button {
                    border-radius: 50px;
                    padding: 0 25px;

                    font-family: sans-serif;
                    font-size: 14px;
                    border: solid black 1px;
                    background-color: #FFF;

                    &:hover {
                        background-color: #F0F0F0;
                    }
                }
            }
        }
    }
</style>
