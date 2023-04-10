<script lang="ts">
	import { page } from "$app/stores";
	import Block from "$lib/block/Block.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let profile: Profile = data.profile;

	let done = 0;
	console.time("load blocks");
	$: if (done === profile?.blocks.length) {
		console.timeEnd("load blocks");
	}

	let style = "";
	if (profile.background) {
		try {
			const url = new URL(profile.background);
			style = `background: url(${url}) center center / cover no-repeat;`;
		} catch {
			style = `background: ${profile.background};`;
		}
	}
</script>

{#if data.ok}
	<div class="h-full w-full bg-base-100 flex flex-col items-center px-2" {style}>
		<div class="w-full h-full max-w-lg overflow-auto">
			<div class="w-full pt-12" />
			{#each profile.blocks as block}
				<Block {block} on:done={() => done++} />

				{#if done === profile.blocks.length}
					<div class="divider" />
				{/if}
			{/each}
			<div class="w-full flex justify-center items-center">
				<a
					class="btn btn-sm btn-ghost italic normal-case"
					href="https://github.com/JacobLinCool/portal"
					target="_blank"
				>
					{done === profile.blocks.length ? "Portal" : "Loading"}
				</a>
			</div>
		</div>
	</div>
{:else}
	<div class="h-full w-full bg-base-100 flex flex-col items-center justify-center">
		<div class="p-4 bg-error rounded-lg text-error-content w-full max-w-lg">
			<p class="text-lg">Error loading profile from GitHub</p>
			<p class="text-base my-4">
				Cannot load profile for <a
					class="link"
					href="https://github.com/{$page.params.username}/{$page.params
						.username}/blob/main/portal.json"
					target="_blank"
				>
					{$page.params.username}
				</a>
			</p>
			<a
				class="btn btn-outline"
				href="https://github.com/JacobLinCool/portal"
				target="_blank"
			>
				View on GitHub
			</a>
		</div>
	</div>
{/if}
