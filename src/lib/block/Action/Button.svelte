<script lang="ts">
	import ActionDisplay from "./ActionDisplay.svelte";
	import { hook1 } from "$lib/webhook";

	export let action: Action;

	async function click(h: ActionHandle): Promise<void> {
		switch (h.type) {
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
		on:click={() => hook1("click", { type: "link", value: action.handle.value })}
	>
		<ActionDisplay display={action.display} />
	</a>
{:else}
	<button class="contents" on:click={() => click(action.handle)} title={action.description}>
		<ActionDisplay display={action.display} />
	</button>
{/if}
