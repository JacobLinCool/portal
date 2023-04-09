<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let block: Block;

	const dispatch = createEventDispatcher();

	const blocks = {
		["head"]: () => import("./Head/Head.svelte"),
		["chat"]: () => import("./Chat/Chat.svelte"),
		["action"]: () => import("./Action/Action.svelte"),
		["unknown"]: () => import("./Unknown/Unknown.svelte"),
	};

	let selected = block.block;
	let BlockComponent: ConstructorOfATypedSvelteComponent | undefined;
	$: {
		if (selected in blocks) {
			blocks[selected as keyof typeof blocks]().then((m) => {
				BlockComponent = m.default;
				dispatch("done");
			});
		} else {
			blocks.unknown().then((m) => {
				BlockComponent = m.default;
				dispatch("done");
			});
		}
	}
</script>

{#if BlockComponent}
	<svelte:component this={BlockComponent} {block} />
{/if}
