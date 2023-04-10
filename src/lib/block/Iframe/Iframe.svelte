<script lang="ts">
	export let block: IframeBlock;

	let style = "";
	if (block.width) {
		style += `width: ${block.width}px !important;`;
	}
	if (block.height) {
		style += `height: ${block.height}px !important;`;
	}
</script>

<iframe
	src={block.src}
	title={block.src}
	frameborder="0"
	class="h-full w-full rounded-md"
	{style}
/>
