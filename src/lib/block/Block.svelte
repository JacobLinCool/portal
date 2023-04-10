<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let block: Block;
	export let blocks: Block[] = [];

	const dispatch = createEventDispatcher();

	const components = {
		["head"]: () => import("./Head/Head.svelte"),
		["chat"]: () => import("./Chat/Chat.svelte"),
		["action"]: () => import("./Action/Action.svelte"),
		["carousel"]: () => import("./Carousel/Carousel.svelte"),
		["iframe"]: () => import("./Iframe/Iframe.svelte"),
		// ["code"]: () => import("./Code/Code.svelte"),
		["error"]: () => import("./Error/Error.svelte"),
		["unknown"]: () => import("./Unknown/Unknown.svelte"),
	};

	let selected = block.block;
	let BlockComponent: ConstructorOfATypedSvelteComponent | undefined;
	$: {
		if (selected in components) {
			components[selected as keyof typeof components]().then((m) => {
				BlockComponent = m.default;
				dispatch("done");
			});
		} else {
			components.unknown().then((m) => {
				BlockComponent = m.default;
				dispatch("done");
			});
		}
	}
</script>

{#if BlockComponent}
	<svelte:component this={BlockComponent} {block} {blocks} />
{/if}
