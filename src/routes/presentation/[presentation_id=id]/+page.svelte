<script lang="ts">
    import Header from "./Header.svelte";
    import SideBar from "../../../lib/editor/SideBar/SideBar.svelte";
    import SlideView from "./SlideView.svelte";
    import SpeakerNotes from "./SpeakerNotes.svelte";
    import { page } from "$app/stores";
    import { error } from "@sveltejs/kit";
    import { query_presentation } from "$lib/data";
    import { writable } from "svelte/store";
    import { Slide } from "$lib";
    import {
        HotkeyHandler,
        type ActionName,
    } from "$lib/editor/actions/actions";
    import { Selection } from "$lib/editor/selection";
    import ActionModal from "$lib/modals/ActionModal.svelte";

    let id = Number($page.params["presentation_id"]);
    let _presentation = query_presentation(id);
    if (!_presentation) {
        throw error(404, "Not Found");
    }
    let presentation = writable(_presentation);
    let current_slide = writable(0);
    $: slide = $presentation.slides[$current_slide];

    let selection = new Selection();
    let collapsed = false;

    let action_modal: ActionName | null = null;

    function handle_action(action_name: ActionName) {
        switch (action_name) {
            case "slide/new":
                $presentation.slides.splice($current_slide + 1, 0, new Slide());
                $current_slide += 1;
                $presentation = $presentation;
                break;
            case "slide/duplicate":
                $presentation.slides.splice($current_slide, 0, slide);
                $current_slide += 1;
                $presentation = $presentation;
                break;
            case "slide/delete":
                $presentation.slides.splice($current_slide, 1);
                $presentation = $presentation;
                break;
            case "edit/delete":
                if (selection.selected_slide) {
                    $presentation.slides.splice(selection.selected_slide[0], 1);
                    $presentation = $presentation;
                } else if (selection.selected_object) {
                    slide.objects.splice(selection.selected_object[0], 1);
                    selection.deselect();
                    selection = selection;
                    $presentation = $presentation;
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
        bind:selection
    />
    <SlideView {slide} bind:selection />
    <SpeakerNotes bind:notes={slide.notes} />
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
