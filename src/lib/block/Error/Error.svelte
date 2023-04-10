<script lang="ts">
	export let error: string;
	export let block: Block;
</script>

<div class="rounded-lg bg-error p-4 text-error-content">
	<p>Error: {error}</p>
	<pre class="overflow-auto"><code>{JSON.stringify(block, null, 4)}</code></pre>
</div>
