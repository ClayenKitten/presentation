<script lang="ts">
    export let ctrl: boolean = false;
    export let shift: boolean = false;
    export let key: string;

    $: data =
        (ctrl ? "<kbd>Ctrl</kbd> + " : "") +
        (shift ? "<kbd>Shift</kbd> + " : "") +
        `<kbd>${key}</kbd>`;
</script>

<kbd>{@html data}</kbd>

<style lang="scss">
    kbd,
    kbd > :global(kbd) {
        font-size: 14px;
        color: #666;
        word-spacing: -0.25em;
    }
</style>
