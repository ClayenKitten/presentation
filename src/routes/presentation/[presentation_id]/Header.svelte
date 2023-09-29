<script lang="ts">
    import MenuBar from "./MenuBar.svelte";

    export let title: String;
</script>

<header>
    <a id="home" href="/" title="Home">
        <img src="/favicon.png" alt="home"/>
    </a>
    <menu id="titlebar">
        <h1 id="title">{title}</h1>
    </menu>
    <MenuBar/>
    <menu id="toolbar"></menu>
</header>

<style lang="scss">
    header {
        --titlebar-height: 30px;
        --menubar-height: 30px;
        --toolbar-height: 50px;

        background-color: red;
        grid-area: head;

        display: grid;
        grid-template-rows: var(--titlebar-height) var(--menubar-height) var(--toolbar-height);
        grid-template-columns: 60px 1fr;
        grid-template-areas:
            "home    titlebar"
            "home    menubar"
            "toolbar toolbar";

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
                background-color: aqua;

                display: flex;
                align-items: center;

                padding: 0 20px;

                h1 {
                    margin: 0;
                    font-size: 14pt;
                }
            }
            &#toolbar {
                grid-area: toolbar;
                background-color: yellow;
            }
        }
    }
</style>
