<script lang="ts">
    import Kbd from "$lib/Components/Util/Kbd.svelte";
    import { createEventDispatcher } from "svelte";
    import type { Entry } from "./types";
    import i18n from "$lib/translation";
    import { get_hotkey as getHotkey } from "$lib/actions";
    import Icon from "$lib/Components/Util/Icon.svelte";

    export let entry: Entry;
    export let level: number = 0;

    const text = i18n(entry.translation_key);
    let hotkey = getHotkey(entry.key);

    let dispatch = createEventDispatcher();

    let selected = entry.action_key != null ?
        (cur_entry: Entry) => {
            let active = document.activeElement;
            if (active && active instanceof HTMLElement) {
                active.blur();
            }
            dispatch('action', entry.action_key);
        }
    : (_: Entry) => {};
</script>

<li>
    <button on:click={() => selected(entry)}>
        <span>
            {#if entry.icon}
                <Icon icon={entry.icon}/>
            {/if}
        </span>
        <span>{text}</span>
        {#if hotkey}
            <Kbd
                shift={hotkey.shift}
                ctrl={hotkey.ctrl}
                key={hotkey.display_name}
            />
        {:else if entry.children && entry.children.length != 0}
            <Icon icon="caret-right"/>
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
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            width: 30px;
        }
        & :nth-child(2) {
            flex: 1;
            font-size: 14px;
            text-align: start;
        }
    }
</style>
