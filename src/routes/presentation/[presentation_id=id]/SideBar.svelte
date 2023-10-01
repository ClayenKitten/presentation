<script lang="ts">
    import type { Slide } from "$lib";

    export let current_slide: number;
    export let slides: Slide[];
    function style(i: number) {
        let slide = slides[i];
        return slide.background instanceof URL
            ? `background-image: url(${slide.background})`
            : `background-color: ${slide.background}`;
    }
</script>

<aside>
    <ol id="slide-list">
        {#each slides as slide, i}
            <li>
                <button on:click={(_) => (current_slide = i)}>
                    <div class="slide-number">{i + 1}</div>
                    <div class="slide-preview" style={style(i)}></div>
                </button>
            </li>
        {/each}
    </ol>
    <menu>
        <button title="Grid view">
            <i class="ph-bold ph-grid-four"></i>
        </button>
        <button title="Hide slide list">
            <i class="ph-bold ph-arrow-left"></i>
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
                display: contents;
                flex: 0 0 auto;
                cursor: pointer;

                button {    
                    display: flex;
                    gap: calc(var(--spacing) / 2);
                    background: none;
                    border: none;
                }

                .slide-number {
                    flex: 0 1 20px;
                    text-align: end;
                }

                &:hover .slide-number {
                    font-weight: bolder;
                }

                .slide-preview {
                    flex: 1 auto;
                    aspect-ratio: 16 / 9;
                    height: auto;

                    border: solid 1px #DDD;
                    border-radius: 5px;
                    background-size: 100% 100%;
                }

                &:hover .slide-preview {
                    border-color: blue;
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

            > button {
                height: 40px;
                width: 40px;
                border: solid gray 1px;
            }
        }
    }
</style>
