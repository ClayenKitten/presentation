<script lang="ts">
    import i18n from "$lib/translation";
    import Entry from "./Entry.svelte";
    import type { TopLevelEntry } from "./types";

    export let entry: TopLevelEntry;
    let text = i18n(entry.translation_key);
</script>

<li>
    <button>
        <span>{text}</span>
    </button>
    <ul>
        {#each entry.children as child}
            <Entry entry={child} />
        {/each}
    </ul>
</li>

<style lang="scss">
    button {
        height: 100%;
        padding: 0 10px;
        border: none;

        display: flex;
        font-weight: bolder;
        justify-content: center;
        align-items: center;
    }
</style>
