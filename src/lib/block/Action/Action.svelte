<script lang="ts">
	import Button from "./Button.svelte";

	export let block: ActionBlock;
</script>

<div class="p-2 rounded-md my-4">
	<div class="text-sm mb-2">{block.title}</div>
	<div class="flex flex-col gap-4">
		{#each block.actions as action}
			<Button {action} />
		{/each}
	</div>
</div>
