<script lang="ts">
    import { ArrowLeft, GridFour } from "phosphor-svelte";
    import { slide } from "svelte/transition";

    export let slides: Slide[];
</script>

<aside>
    <ol id="slide-list">
        {#each slides as slide, i }
            <li>
                <div class="slide-number">{i+1}</div>
                <div class="slide-preview" style="background-color: {slide.background};"></div>
            </li>
        {/each}
    </ol>
    <menu>
        <button title="Grid view">
            <GridFour size="32px"/>
        </button>
        <button title="Hide slide list">
            <ArrowLeft size="32px"/>
        </button>
    </menu>
</aside>

<style lang="scss">
    aside {
        grid-area: side;
        background-color: #CCC;
        
        display: flex;
        flex-direction: column;

        ol#slide-list {
            --spacing: 16px;

            flex: 1;
            overflow-y: scroll;
            list-style: none;

            display: flex;
            flex-direction: column;

            margin: 0;
            padding: var(--spacing);
            gap: var(--spacing);

            > li {
                flex: 0 0 auto;
                
                display: flex;
                gap: calc(var(--spacing) / 2);

                .slide-number {
                    flex: 0 1 20px;
                    text-align: end;
                }

                .slide-preview {
                    flex: 1 auto;
                    aspect-ratio: 16 / 9;
                    height: auto;

                    border: solid 1px #DDD;
                    border-radius: 5px;
                }
            }
        }

        menu {
            display: flex;
            gap: 10px;
            padding: 10px;

            height: 40px;
            margin: 0;
            background-color: gray;

            >button {
                height: 40px;
                width: 40px;
                border: solid gray 1px;
            }
        }
    }
</style>
