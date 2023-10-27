<script lang="ts">
    import type { PresentationInfo } from "$lib";

    export let id: string;
    export let presentation: PresentationInfo;
</script>

<a class="entry" href="/presentation/{id}">
    <img
        alt=""
        src="https://azurestandard.imgix.net/cms/cheeseweb2.jpg?auto=format,compress&crop=faces,edges&w=750&ar=16:9&fit=crop"
    />
    <div>
        <h2>{presentation.name}</h2>
        <!-- TODO: add link to author of presentation -->
        <a href="/author/todo">By {presentation.author}</a>
    </div>
</a>

<style lang="scss">
    .entry {
        display: flex;
        flex-direction: column;

        box-sizing: border-box;
        background-color: white;
        text-decoration: none;
        color: unset;
        border-radius: 5px;
        overflow: hidden;

        border: 1px solid #dfe1e5;
        &:hover {
            border-color: #f9ab00;
        }

        > img {
            aspect-ratio: 16 / 9;
            width: 100%;
        }

        > div {
            padding: 12px;

            > h2,
            > a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            > h2 {
                font-family: sans-serif;
                font-size: 18px;
                margin: 0;
                margin-bottom: 5px;
            }
            > a {
                font-family: sans-serif;
                font-size: 16px;
                color: #5d5d5e;
                text-decoration: underline;
            }
        }
    }
</style>
