<script lang="ts">
	export let block: Block;
</script>

<div class="bg-error text-error-content p-4 rounded-lg">
	<p>Unknown Block Type: {block.block}</p>
	<pre><code>{JSON.stringify(block, null, 4)}</code></pre>
</div>
