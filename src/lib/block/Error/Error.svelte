<script lang="ts">
	export let error: string;
	export let block: Block;
</script>

<div class="bg-error text-error-content p-4 rounded-lg">
	<p>Error: {error}</p>
	<pre class="overflow-auto"><code>{JSON.stringify(block, null, 4)}</code></pre>
</div>
