<script lang="ts">
	import Icon from "@iconify/svelte";

	export let display: ActionDisplay;

	let style = "";
	if (display.color) {
		// change css variable bc
		style += `--bc: ${display.color};`;
	}
	if (display.css) {
		style += display.css;
	}
</script>

<div class="btn w-full btn-outline normal-case text-lg" {style}>
	{#if display.icon}
		<span class="mr-1 inline-block"> <Icon icon={display.icon} inline /></span>
	{/if}
	{display.text}
</div>
