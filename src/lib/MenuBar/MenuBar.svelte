<script lang="ts">
    import { setContext } from "svelte";
    import TopLevelEntry from "./TopLevelEntry.svelte";
    import { Entry, TopLevelEntry as TopLevel } from "./types";
    import { Hotkey } from "$lib/util";

    setContext("hotkeys", {
        "open": new Hotkey({ ctrl: true, key: "O" }),
        "undo": new Hotkey({ ctrl: true, key: "Z" }),
        "redo": new Hotkey({ ctrl: true, key: "Y" }),
        "cut": new Hotkey({ ctrl: true, key: "X" }),
        "copy": new Hotkey({ ctrl: true, key: "C" }),
        "paste": new Hotkey({ ctrl: true, key: "V" }),
        "new_slide": new Hotkey({ ctrl: true, key: "M" }),
        "delete": new Hotkey({ key: "Del" }),
    })

    class Action {
        display_name: string;
        hotkey?: Hotkey;

        constructor(key: string, display_name: string) {
            this.display_name = display_name;
        }
    }

    const entries: TopLevel[] = [
        new TopLevel("file", [
            new Entry("new", "file-plus"),
            new Entry("open", "folder"),
            new Entry("download", "download-simple"),
        ]),
        new TopLevel("edit", [
            new Entry("undo", "arrow-u-up-left"),
            new Entry("redo", "arrow-u-up-right"),
            new Entry("cut", "scissors"),
            new Entry("copy", "copy"),
            new Entry("paste", "clipboard"),
            new Entry("delete", "trash-simple"),
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
            new Entry("new_slide", "plus-circle"),
            new Entry("duplicate_slide", "copy"),
            new Entry("delete_slide", "trash"),
            new Entry("background", "paint-bucket"),
            new Entry("transition", "cards"),
        ]),
    ]
</script>

<menu>
    <ul>
        {#each entries as entry}
            <TopLevelEntry {entry} />
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

        ul li :global(button) {
            width: 100%;
            height: 100%;
            border: none;
            cursor: pointer;

            display: flex;
            font-weight: bolder;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }

        ul {
            display: flex;
            height: 30px;
            z-index: 1;
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
