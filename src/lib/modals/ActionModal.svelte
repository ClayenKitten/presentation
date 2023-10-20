<script lang="ts">
    import type { ActionName } from "$lib/editor/actions/actions";
    import InsertImage from "./InsertImage.svelte";

    export let action: ActionName | null;

    const closed = () => {
        action = null;
    }
</script>

{#if action}
    {#if action == "insert/image"}
        <InsertImage on:close={closed}/>
    {/if}
{/if}
