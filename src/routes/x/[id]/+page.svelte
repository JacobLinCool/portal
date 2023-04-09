<script lang="ts">
	import Block from "$lib/block/Block.svelte";

	let profile: Profile = {
		blocks: [
			{
				block: "head",
				permission: 0,
				display: "Jacob Lin",
				avatar: "https://storage.jacoblin.cool/avatar.jpg",
			},
			{
				block: "chat",
				permission: 0,
				greeting:
					"👋 嗨！我是林振可（Jacob Lin），目前就讀於師大資工\n我喜歡寫些有趣的東西",
			},
			{
				block: "action",
				title: "你可以在這些地方找到我～",
				permission: 0,
				actions: [
					{
						display: {
							icon: "mdi:github",
							text: "GitHub",
							color: "",
						},
						handle: {
							type: "link",
							value: "https://github.com/JacobLinCool",
						},
					},
					{
						display: {
							icon: "mdi:linkedin",
							text: "LinkedIn",
							color: "210 90% 40%",
						},
						handle: {
							type: "link",
							value: "https://www.linkedin.com/in/jacoblincool/",
						},
					},
					{
						display: {
							icon: "carbon:logo-discord",
							text: "Discord",
							color: "235 86% 65%",
						},
						handle: {
							type: "link",
							value: "https://discord.gg/Ff8q2SGut2",
						},
					},
				],
			},
		],
	};

	let done = 0;
	console.time("load blocks");
	$: if (done === profile.blocks.length) {
		console.timeEnd("load blocks");
	}
</script>

<div class="h-full w-full bg-base-100 flex flex-col items-center px-2">
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
