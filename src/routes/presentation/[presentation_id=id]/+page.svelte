<script lang="ts">
    import Header from "$lib/Components/Editor/Header/Header.svelte";
    import SideBar from "$lib/Components/Editor/SideBar/SideBar.svelte";
    import SlideView from "./SlideView.svelte";
    import SpeakerNotes from "$lib/Components/Editor/SpeakerNotes.svelte";
    import { writable } from "svelte/store";
    import { Slide } from "$lib";
    import { HotkeyHandler, type ActionName } from "$lib/actions";
    import { Selection } from "$lib/Components/Editor/Canvas/selection";
    import ActionModal from "$lib/Components/Editor/Modals/ActionModal.svelte";
    import type { PageData } from './$types';

	export let data: PageData;

    let presentation = writable(data.presentation);
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
                $presentation.slides.splice($current_slide, 0, structuredClone(slide));
                $current_slide += 1;
                $presentation = $presentation;
                break;
            case "slide/delete":
                $presentation.slides.splice($current_slide, 1);
                $presentation = $presentation;
                break;
            case "edit/delete":
                if ($selection.selected_slide) {
                    $presentation.slides.splice($selection.selected_slide[0], 1);
                    $presentation = $presentation;
                } else if ($selection.selected_object) {
                    slide.objects.splice($selection.selected_object[0], 1);
                    selection.deselect();
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
