<script lang="ts">
    import TopLevelEntry from "./TopLevelEntry.svelte";
    import { Entry, TopLevelEntry as TopLevel } from "./types";

    const entries: TopLevel[] = [
        new TopLevel("file", [
            new Entry("file/new", "file-plus"),
            new Entry("file/open", "folder"),
            new Entry("file/download", "download-simple"),
        ]),
        new TopLevel("edit", [
            new Entry("edit/undo", "arrow-u-up-left"),
            new Entry("edit/redo", "arrow-u-up-right"),
            new Entry("edit/cut", "scissors"),
            new Entry("edit/copy", "copy"),
            new Entry("edit/paste", "clipboard"),
            new Entry("edit/delete", "trash-simple"),
        ]),
        new TopLevel("insert", [
            new Entry("insert/text", "text-aa"),
            new Entry("insert/image", "image"),
            new Entry("insert/video", "video"),
            new Entry("insert/audio", "speaker-high"),
            new Entry("insert/shapes", "shapes", [
                new Entry("insert/rect", "rectangle"),
                new Entry("insert/oval", "circle"),
                new Entry("insert/diamond", "diamond"),
                new Entry("insert/parallelogram", "parallelogram"),
                new Entry("insert/triangle", "triangle"),
                new Entry("insert/connection", "line-segment", [
                    new Entry("insert/connection/line", "line-segment"),
                    new Entry("insert/connection/arrow_simple", "arrow-right"),
                    new Entry("insert/connection/arrow_fat", "arrow-fat-right"),
                ]),
            ]),
            new Entry("insert/qr-code", "qr-code"),
        ]),
        new TopLevel("slide", [
            new Entry("slide/new", "plus-circle"),
            new Entry("slide/duplicate", "copy"),
            new Entry("slide/delete", "trash"),
            new Entry("slide/background", "paint-bucket"),
            new Entry("slide/transition", "cards"),
        ]),
    ]
</script>

<menu id="menubar">
    <ul>
        {#each entries as entry}
            <TopLevelEntry {entry} on:action/>
        {/each}
    </ul>
</menu>

<style lang="scss">
    menu {
        grid-area: menubar;
        display: block;
        margin: 0;
        padding: 0;
        :global(ul) {
            display: flex;
            position: absolute;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        ul {
            display: flex;
            height: 30px;
            z-index: var(--menu-z-index);
        }

        :global(button) {
            background: none;
        }

        :global(li) {
            background: #fff;
        }
        :global(li:hover),
        :global(li:focus-within) {
            background: #eee;
        }

        :global(li > ul) {
            display: none;
        }
        :global(li:focus-within > ul) {
            display: block;
        }
    }
</style>
