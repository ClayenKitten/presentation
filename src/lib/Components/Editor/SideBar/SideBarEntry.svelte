<script lang="ts">
    import type { Slide } from "$lib";
    import type { SelectionStore } from "$lib/stores/selection";

    export let i: number;
    export let slide: Slide;

    export let current_slide: number;
    export let selection: SelectionStore;

    function on_click() {
        current_slide = i;
        selection.select_slide(i, slide);
        selection = selection;
    }

    $: style = slide.background.startsWith("url")
        ? `background-image: ${slide.background}`
        : `background-color: ${slide.background}`;
</script>

<li class:selected={current_slide == i}>
    <button on:click={on_click}>
        <div class="slide-number">{i + 1}</div>
        <div class="slide-preview" {style}></div>
    </button>
</li>

<style lang="scss">
    li {
        display: contents;
        flex: 0 0 auto;
        cursor: pointer;

        button {    
            display: flex;
            gap: calc(var(--spacing) / 2);
            background: none;
            border: none;
        }

        .slide-preview {
            flex: 1 auto;
            aspect-ratio: 16 / 9;
            height: auto;
            background-size: 100% 100%;
        }
        // Number
        .slide-number {
            flex: 0 1 20px;
            text-align: end;
        }
        &:hover .slide-number, &.selected .slide-number {
            font-weight: bolder;
        }
        // Border
        .slide-preview {
            box-sizing: border-box;
            border: solid 1px #CCC;
            border-radius: 5px;
        }
        &.selected .slide-preview {
            border: solid 2px #555;
        }
        &:hover .slide-preview {
            border: solid 2px rgb(0, 0, 230);
        }
    }
</style>
