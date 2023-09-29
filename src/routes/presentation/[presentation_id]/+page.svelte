<script lang="ts">
    import Header from "./Header.svelte";
    import SideBar from "./SideBar.svelte";
    import Slide from "./Slide.svelte";
    import SpeakerNotes from "./SpeakerNotes.svelte";

    const current_slide: number = 0;
    const presentation: Presentation = {
        info: {
            name: "Presentation name",
            author: "Author name",
        },
        styles: {},
        slides: [
            {
                background: "#FFF",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "egeg",
                objects: [],
            },
        ],
    };
</script>

<div id="wrapper">
    <Header title={presentation.info.name}/>
    <SideBar slides={presentation.slides}/>
    <Slide slide={presentation.slides[current_slide]}/>
    <SpeakerNotes notes = {presentation.slides[current_slide].notes}/>
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
