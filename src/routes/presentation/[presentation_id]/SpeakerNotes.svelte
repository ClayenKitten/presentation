<script lang="ts">
    export let notes: string;
</script>

<section>
    <span id="speaker_notes" placeholder="Speaker notes..." contenteditable="true"></span>
</section>

<style lang="scss">
    section {
        grid-area: notes;
        background-color: gray;

        display: flex;
        padding: 10px;

        #speaker_notes {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            overflow-y: scroll;

            padding: 0 10px;
            background-color: white;
            border: solid gray 1px;

            overflow: auto;
            white-space: pre-wrap;

            &:empty {
                &:focus::before {
                    content:  "\00a0";
                }
                &:not(:focus)::before {
                    content: attr(placeholder);
                    color: grey;
                    font-style: italic;
                }
            }
        }
    }
</style>
