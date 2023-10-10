<script lang="ts">
    import Header from "./Header.svelte";
    import SideBar from "../../../lib/editor/SideBar/SideBar.svelte";
    import SlideView from "./SlideView.svelte";
    import SpeakerNotes from "./SpeakerNotes.svelte";
    import { page } from "$app/stores";
    import { error } from "@sveltejs/kit";
    import { query_presentation } from "$lib/data";
    import { derived, writable } from "svelte/store";
    import { Slide } from "$lib";
    import type { ActionName } from "$lib/editor/actions/actions";
    import { Selection } from "$lib/editor/selection";

    let id = Number($page.params["presentation_id"]);
    let _presentation = query_presentation(id);
    if (!_presentation) {
        throw error(404, 'Not Found');
    }
    let presentation = writable(_presentation);
    let current_slide = writable(0);
    $: slide = $presentation.slides[$current_slide]

    let selection = new Selection();
    let collapsed = false;

    function on_action(event: CustomEvent<ActionName>) {
        let action_key = event.detail;
        switch (action_key) {
            case 'slide/new':
                $presentation.slides.splice($current_slide + 1, 0, new Slide());
                $current_slide += 1;
                $presentation = $presentation;
                break;
            case 'slide/duplicate':
                $presentation.slides.splice($current_slide, 0, slide);
                $current_slide += 1;
                $presentation = $presentation;
                break;
            case 'slide/delete':
                $presentation.slides.splice($current_slide, 1);
                $presentation = $presentation;
                break;
            default:
                console.error(`Unhandled action key: ${action_key}`);
                break;
        }
    }
</script>

<div id="wrapper" class:collapsed={collapsed}>
    <Header title={$presentation.info.name} on:action={on_action}/>
    <SideBar
        presentation={$presentation}
        bind:current_slide={$current_slide}
        bind:collapsed={collapsed}
        bind:selection={selection}
    />
    <SlideView {slide} bind:selection={selection}/>
    <SpeakerNotes bind:notes={slide.notes}/>
</div>

<style lang="scss">
    #wrapper {
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
