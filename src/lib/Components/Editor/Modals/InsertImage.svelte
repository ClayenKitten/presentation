<script lang="ts">
    import Modal from "./Modal.svelte";
</script>

<Modal header="Insert image" buttons="Ok" on:close>
    <input type="url" placeholder="Enter image URL..." />
</Modal>

<style lang="scss">
    input {
        width: max(25vw, 300px);
        height: 40px;
        padding: 0 10px;
        border: 1px #AAA solid;
        border-radius: 5px;
        font-size: 18px;
    }
</style>
