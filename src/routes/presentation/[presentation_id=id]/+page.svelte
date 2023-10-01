<script lang="ts">
    import Header from "./Header.svelte";
    import SideBar from "./SideBar.svelte";
    import Slide from "./Slide.svelte";
    import SpeakerNotes from "./SpeakerNotes.svelte";
    import { page } from "$app/stores";
    import { error } from "@sveltejs/kit";
    import { query_presentation } from "$lib/data";

    let id = Number($page.params["presentation_id"]);
    let _presentation = query_presentation(id);
    let presentation: Presentation;
    $: if (_presentation) {
        presentation = _presentation;
    } else {
        throw error(404, 'Not Found');
    }
    let current_slide: number = 0;
    $: slide = presentation.slides[current_slide];
</script>

<div id="wrapper">
    <Header title={presentation.info.name}/>
    <SideBar bind:current_slide = {current_slide} slides = {presentation.slides}/>
    <Slide slide={slide}/>
    <SpeakerNotes bind:notes = {slide.notes}/>
</div>

<style lang="scss">
    #wrapper {
		margin: 0;
		height: 100vh;

		display: grid;
		grid-template-rows: 110px 1fr 60px;
        grid-template-columns: 220px 1fr;
        grid-template-areas:
            "head head"
            "side main"
            "side notes";
    }
</style>
