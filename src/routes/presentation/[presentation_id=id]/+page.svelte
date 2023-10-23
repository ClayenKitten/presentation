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
    import { clipboard } from "$lib/stores/clipboard";

    export let data: PageData;

    let current_slide = writable(0);
    let presentation = new PresentationStore(data.presentation);
    $: slide = presentation.slide($current_slide);
    $: notes = slide.notes;

    let selection = new SelectionStore();

    let collapsed = false;
    let action_modal: ActionName | null = null;

    $: { $current_slide; clipboard.changed_slide(); };

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
            case "edit/copy":
                if ($selection.selected_object) {
                    clipboard.put_object($selection.selected_object[1]);
                } else if ($selection.selected_slide) {
                    clipboard.put_slide($selection.selected_slide[1]);
                }
                break;
            case "edit/cut":
                if ($selection.selected_object) {
                    clipboard.put_object($selection.selected_object[1]);
                    handle_action("edit/delete");
                } else if ($selection.selected_slide) {
                    clipboard.put_slide($selection.selected_slide[1]);
                    handle_action("edit/delete");
                }
                break;
            case "edit/paste":
                if (!$clipboard) break;
                if ($clipboard[0] == "object") {
                    let object = slide.add_object($clipboard[1]);
                    selection.select_object($slide.objects.length - 1, object);

                    let offset = clipboard.object_offset;
                    object.position.x += offset.x;
                    object.position.y += offset.y;
                } else {
                    let slide = presentation.insert_slide($current_slide + 1, $clipboard[1]);
                    selection.select_slide($presentation.slides.length - 1, slide);
                    $current_slide += 1;
                }
                clipboard.pasted();
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
