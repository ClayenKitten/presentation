<script lang="ts">
    export let header: string | undefined;
	export let buttons: "Ok" | undefined;

	let dialog: HTMLDialogElement;

	$: if (dialog) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		{#if header}
			<h1>{header}</h1>
		{/if}
		<slot />
		{#if buttons}
			<div class="buttons">
				{#if buttons == "Ok"}
					<button>OK</button>
				{/if}
			</div>
		{/if}
	</div>
</dialog>

<style lang="scss">
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;

		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
		}

		> div {
			display: flex;
			flex-direction: column;
			padding: 16px;
			gap: 16px;

			> h1 {
				display: block;
				font-size: 21px;
				font-family: sans-serif;
				margin: 0;
				padding: 0 0 10px 0;
			}

			> .buttons {
				display: flex;
				justify-content: end;

				> button {
					width: 80px;
					height: 40px;
					background-color: white;
					border: 1px #AAA solid;
					border-radius: 5px;
					font-size: 18px;
				}
			}
		}
	}
</style>
