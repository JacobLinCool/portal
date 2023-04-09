<script lang="ts">
	export let block: HeadBlock;
</script>

<div class="w-full flex flex-col justify-center items-center gap-2">
	<div class="avatar">
		<div class="w-20 rounded-full">
			<img src={block.avatar} alt="{block.display}'s Avatar" />
		</div>
	</div>
	<p class="text-lg">{block.display}</p>
	{#if block.description}
		<p class="text-sm">{block.description}</p>
	{/if}
</div>
