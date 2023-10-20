<script lang="ts">
    export let icon: string;
</script>

<i class={`ph-bold ph-${icon}`}/>

<style lang="scss">
    i {
        font-size: var(--icon-size, inherit);
    }
</style>
