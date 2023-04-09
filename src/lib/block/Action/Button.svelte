<script lang="ts">
	import ActionDisplay from "./ActionDisplay.svelte";

	export let action: Action;

	async function click(h: ActionHandle): Promise<void> {
		switch (h.type) {
			case "link": {
				const w = window.open("", "_blank");
				if (w) {
					setTimeout(() => {
						w.location.href = h.value;
					}, 10);
				}

				break;
			}
			default: {
				console.error("Unknown handle type", h);
				break;
			}
		}
	}
</script>

{#if action.handle.type === "link"}
	<a
		class="contents"
		href={action.handle.value}
		target="_blank"
		rel="noopener noreferrer"
		title={action.description}
	>
		<ActionDisplay display={action.display} />
	</a>
{:else}
	<button class="contents" on:click={() => click(action.handle)} title={action.description}>
		<ActionDisplay display={action.display} />
	</button>
{/if}
