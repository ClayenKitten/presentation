<script lang="ts">
    import Header from "$lib/Components/Editor/Header/Header.svelte";
    import SideBar from "$lib/Components/Editor/SideBar/SideBar.svelte";
    import SlideView from "./SlideView.svelte";
    import SpeakerNotes from "$lib/Components/Editor/SpeakerNotes.svelte";
    import { writable } from "svelte/store";
    import { HotkeyHandler, type ActionName } from "$lib/actions";
    import { SelectionStore } from "$lib/stores/selection";
    import ActionModal from "$lib/Components/Editor/Modals/ActionModal.svelte";
    import type { PageData } from "./$types";
    import { PresentationStore } from "$lib/stores/presentation";

    export let data: PageData;

    let current_slide = writable(0);
    let presentation = new PresentationStore(data.presentation);
    $: slide = presentation.slide($current_slide);
    $: notes = slide.notes;

    let selection = new SelectionStore();

    let collapsed = false;
    let action_modal: ActionName | null = null;

    function handle_action(action_name: ActionName) {
        switch (action_name) {
            case "slide/new":
                presentation.new_slide($current_slide + 1);
                $current_slide += 1;
                break;
            case "slide/duplicate":
                presentation.duplicate_slide($current_slide);
                $current_slide += 1;
                break;
            case "slide/delete":
                if (presentation.slide_number == $current_slide) {
                    $current_slide -= 1;
                }
                presentation.delete_slide($current_slide);
                break;
            case "edit/delete":
                if ($selection.selected_slide) {
                    handle_action("slide/delete");
                } else if ($selection.selected_object) {
                    slide.delete_object($selection.selected_object[0]);
                    selection.deselect();
                }
                break;
            case "insert/image":
                action_modal = action_name;
                break;
            default:
                console.error(`Unhandled action name: ${action_name}`);
                break;
        }
    }

    function on_action(event: CustomEvent<ActionName>) {
        handle_action(event.detail);
    }

    function hotkey_handler(event: KeyboardEvent) {
        let action_name = HotkeyHandler(event);
        if (action_name) {
            handle_action(action_name);
        }
    }
</script>

<svelte:window on:keyup={hotkey_handler} />

<ActionModal bind:action={action_modal} />
<div id="editor" class:collapsed>
    <Header title={$presentation.info.name} on:action={on_action} />
    <SideBar
        presentation={$presentation}
        bind:current_slide={$current_slide}
        bind:collapsed
        {selection}
    />
    <SlideView {slide} {selection} />
    <SpeakerNotes bind:notes={$notes} />
</div>

<style lang="scss">
    #editor {
        margin: 0;
        height: 100vh;

        display: grid;
        grid-template-rows: 110px 1fr 60px;
        grid-template-columns: min-content 1fr;
        grid-template-areas:
            "head head"
            "side main"
            "side notes";
        &.collapsed {
            grid-template-areas:
                "head head"
                "main main"
                "side notes";
        }
    }
</style>
