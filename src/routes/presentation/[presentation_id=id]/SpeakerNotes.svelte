<script lang="ts">
    export let notes: string;
</script>

<section>
    <textarea id="speaker_notes" placeholder="Speaker notes..." bind:value={notes}/>
</section>

<style lang="scss">
    section {
        grid-area: notes;

        display: flex;
        padding: 10px;
        padding-left: 0px;

        #speaker_notes {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            overflow-y: scroll;

            padding: 10px;
            background-color: rgb(237, 242, 250);
            border-radius: 10px;
            border: none;

            overflow: auto;
            white-space: pre-wrap;
            resize: none;
            font-size: 14px;
        }
    }
</style>
