<script lang="ts">
    import Kbd from "$lib/Kbd.svelte";
    import { getContext } from "svelte";
    import type { Entry } from "./types";
    import i18n from "$lib/translation";
    import type { Hotkey } from "$lib/util";

    export let entry: Entry;
    export let level: number = 0;

    const text = i18n(entry.translation_key);

    let hotkeys: Record<string, Hotkey> = getContext("hotkeys");

    let hotkey: Hotkey | null = null;
    if (entry.action_key && hotkeys[entry.action_key]) {
        hotkey = hotkeys[entry.action_key];
    }

    let selected = entry.action_key != null ?
        (cur_entry: Entry) => {
            let active = document.activeElement;
            if (active && active instanceof HTMLElement) {
                active.blur();
            }
            console.info(entry.action_key);
        }
    : (_: Entry) => {};
</script>

<li>
    <button on:click={() => selected(entry)}>
        {#if entry.icon}
            <i class="ph-bold ph-{entry.icon}"></i>
        {:else}
            <span></span>
        {/if}
        <span>{text}</span>
        {#if hotkey}
            <Kbd
                shift={hotkey.shift}
                ctrl={hotkey.ctrl}
                key={hotkey.key}
            />
        {:else if entry.children && entry.children.length != 0}
            <i class="ph-bold ph-caret-right"></i>
        {:else}
            <span></span>
        {/if}
    </button>
    {#if entry.children && entry.children?.length != 0}
        <ul>
            {#each entry.children as child}
                <svelte:self level={level+1} entry={child}/>
            {/each}
        </ul>
    {/if}
</li>

<style lang="scss">
    li {
        position: relative;
        ul {
            position: absolute;
            left: 100%;
            top: 0;
        }
    }

    button {
        width: 300px;
        height: 30px;
        border: none;

        display: flex;
        align-items: center;
        gap: 5px;
        padding: {
            top: 5px;
            bottom: 5px;
            left: 5px;
            right: 10px;
        }

        &:hover + ul, & + ul:hover {
            display: block;
        }

        & :nth-child(1) {
            font-size: 18px;
            width: 30px;
            text-align: center;
        }
        & :nth-child(2) {
            flex: 1;
            font-size: 14px;
            text-align: start;
        }
    }
</style>
