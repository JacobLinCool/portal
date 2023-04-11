<script lang="ts">
	import { page } from "$app/stores";
	import Block from "$lib/block/Block.svelte";
	import { get_browser } from "$lib/utils";
	import { setup, hook1 } from "$lib/webhook";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";

	export let data: PageData;

	let profile: Profile = data.profile;

	let done = 0;
	console.time("load blocks");
	$: if (done === profile?.blocks.length) {
		console.timeEnd("load blocks");
	}

	let style = "";
	if (profile?.background) {
		try {
			const url = new URL(profile.background);
			style = `background: url(${url}) center center / cover no-repeat;`;
		} catch {
			style = `background: ${profile.background};`;
		}
	}

	onMount(() => {
		setup(profile?.webhooks, $page.url.href);
		setTimeout(
			() =>
				hook1("visit", {
					browser: get_browser(),
					mobile: "ontouchstart" in window,
					agent: navigator.userAgent,
				}),
			1000,
		);
	});
</script>

<svelte:head>
	<title>{$page.params.username} @GitHub | Portal</title>
	<meta
		name="description"
		content="Check out the GitHub user {$page.params.username}'s profile on Portal"
	/>
</svelte:head>

{#if data.ok}
	<div class="flex h-full w-full flex-col items-center overflow-auto bg-base-100 px-2" {style}>
		<div class="h-full w-full max-w-lg">
			<div class="w-full pt-12" />
			{#each profile.blocks as block}
				<Block {block} blocks={profile.blocks} on:done={() => done++} />

				{#if done === profile.blocks.length}
					<div class="divider" />
				{/if}
			{/each}
			<div class="flex w-full items-center justify-center">
				<a
					class="btn-ghost btn-sm btn normal-case italic"
					href="https://github.com/JacobLinCool/portal"
					target="_blank"
				>
					{done === profile.blocks.length ? "Portal" : "Loading"}
				</a>
			</div>
			<div class="w-full pb-12" />
		</div>
	</div>
{:else}
	<div class="flex h-full w-full flex-col items-center justify-center bg-base-100">
		<div class="w-full max-w-lg rounded-lg bg-error p-4 text-error-content">
			<p class="text-lg">Error loading profile from GitHub</p>
			<p class="my-4 text-base">
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
				class="btn-outline btn"
				href="https://github.com/JacobLinCool/portal"
				target="_blank"
			>
				View on GitHub
			</a>
		</div>
	</div>
{/if}
