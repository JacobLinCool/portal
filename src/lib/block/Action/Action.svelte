<script lang="ts">
	import Button from "./Button.svelte";

	export let block: ActionBlock;
</script>

<div class="my-4 rounded-md p-2">
	<div class="mb-2 text-sm">{block.title}</div>
	<div class="flex flex-col gap-4">
		{#each block.actions as action}
			<Button {action} />
		{/each}
	</div>
</div>
