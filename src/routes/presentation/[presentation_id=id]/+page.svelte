<script lang="ts">
    import Header from "./Header.svelte";
    import SideBar from "../../../lib/editor/SideBar.svelte";
    import SlideView from "./SlideView.svelte";
    import SpeakerNotes from "./SpeakerNotes.svelte";
    import { page } from "$app/stores";
    import { error } from "@sveltejs/kit";
    import { query_presentation } from "$lib/data";
    import { derived, get, writable } from "svelte/store";

    let id = Number($page.params["presentation_id"]);
    let _presentation = query_presentation(id);
    if (!_presentation) {
        throw error(404, 'Not Found');
    }
    let presentation = writable(_presentation);
    let slide_number = writable(0);
    let slide = derived(
        [slide_number, presentation],
        ([$slide_number, $presentation]) => $presentation.slides[$slide_number],
    );

    let collapsed = false;
</script>

<div id="wrapper" class:collapsed={collapsed}>
    <Header title={$presentation.info.name}/>
    <SideBar
        bind:slide_number={$slide_number}
        presentation={$presentation}
        bind:collapsed={collapsed}
    />
    <SlideView slide={$slide}/>
    <SpeakerNotes bind:notes={$slide.notes}/>
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
