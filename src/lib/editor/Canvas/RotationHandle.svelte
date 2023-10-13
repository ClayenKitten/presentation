<div />

<style lang="scss">
    div {
        position: absolute;
        width: var(--handle-size);
        height: var(--handle-size);
        background-color: blue;
        box-sizing: border-box;
        border: solid 1px white;

        left: calc(50% - var(--handle-size) / 2);
        top: calc(-1 * 3 * var(--handle-size));
        border-radius: var(--handle-size);
        cursor: crosshair;
    }
</style>
