<script lang="ts">
    export let horizontal: "left" | "right" | "middle";
    export let vertical: "top" | "bottom" | "middle";

    let classes = [
        horizontal == "middle" ? "middle-h" : horizontal,
        vertical == "middle" ? "middle-v" : vertical,
    ].join(" ");
</script>

<div class={classes} />

<style lang="scss">
    div {
        position: absolute;
        width: var(--handle-size);
        height: var(--handle-size);
        background-color: blue;
        box-sizing: border-box;
        border: solid 1px white;

        &.middle-h {
            left: calc(50% - var(--handle-size) / 2);
        }
        &.middle-v {
            top: calc(50% - var(--handle-size) / 2);
        }
        &.top {
            top: var(--handle-offset);
        }
        &.bottom {
            bottom: var(--handle-offset);
        }
        &.left {
            left: var(--handle-offset);
        }
        &.right {
            right: var(--handle-offset);
        }

        &.top {
            cursor: n-resize;
        }
        &.bottom {
            cursor: s-resize;
        }
        &.left {
            cursor: w-resize;
        }
        &.right {
            cursor: e-resize;
        }
        &.top.left {
            cursor: nw-resize;
        }
        &.top.right {
            cursor: ne-resize;
        }
        &.bottom.left {
            cursor: sw-resize;
        }
        &.bottom.right {
            cursor: se-resize;
        }
    }
</style>
