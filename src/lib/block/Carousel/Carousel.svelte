<script lang="ts">
	import { hook1 } from "$lib/webhook";
	import { onMount, onDestroy } from "svelte";
	import { fade } from "svelte/transition";

	export let block: CarouselBlock;

	export let autoplay: number = block.autoplay ?? 3000;

	let current = 0;
	let interval: number;

	onMount(() => {
		if (autoplay > 0) {
			interval = setInterval(() => {
				current = (current + 1) % block.items.length;
			}, autoplay) as unknown as number;
		}
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<svelte:head>
	{#each block.items as item (item.image)}
		<link rel="preload" href={item.image} as="image" />
	{/each}
</svelte:head>

<div class="h-40 w-full rounded-md md:h-60">
	{#each block.items as item, i (item.image)}
		{#if i === current}
			<svelte:element
				this={item.link ? "a" : "span"}
				class="contents"
				href={item.link}
				target="_blank"
				on:click={() => hook1("click", { type: "link", value: item.link })}
			>
				<div
					class="absolute h-full w-full"
					in:fade={{ duration: 300 }}
					out:fade={{ duration: 300 }}
				>
					<img
						src={item.image}
						alt={item.link}
						class="m-auto h-full rounded-lg object-contain"
					/>
				</div>
			</svelte:element>
		{/if}
	{/each}
</div>

<div class="mt-2 w-full overflow-auto px-2">
	<div class="flex min-w-full items-center justify-center sm:gap-2">
		{#each block.items as item, i (item.image)}
			<button
				class="btn-ghost min-h-8 btn h-8 w-8 rounded-md p-1"
				class:btn-outline={i === current}
				on:click={() => ((current = i), clearInterval(interval))}
			>
				{i + 1}
			</button>
		{/each}
	</div>
</div>
