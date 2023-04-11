<script lang="ts">
	import Block from "$lib/block/Block.svelte";

	let profile: Profile = {
		blocks: [
			{
				block: "head",
				permission: 0,
				display: "Jacob Lin",
				avatar: "https://storage.jacoblin.cool/avatar.jpg",
				share: true,
			},
			{
				block: "chat",
				permission: 0,
				greeting:
					"👋 嗨！我是林振可（Jacob Lin），目前就讀於師大資工\n我喜歡設計些有趣的程式 🎨",
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
			{
				block: "carousel",
				permission: 0,
				items: [
					{
						image: "https://jacoblincool.github.io/avatars/watercolor/watercolor_clapk69xx001d1jsnf8zgg3b8.png",
						link: "https://jacoblincool.github.io/avatars/",
					},
					{
						image: "https://jacoblin.cool/avatars/girl-a/girl-a_claofuyw90005l7sndydd3xvu.png",
						link: "https://jacoblincool.github.io/avatars/",
					},
					{
						image: "https://jacoblin.cool/avatars/boy-a/boy-a_claohdghu000vccsn6o470z4r.png",
						link: "https://jacoblincool.github.io/avatars/",
					},
					{
						image: "https://jacoblin.cool/avatars/purple-girl/purple-girl_clas6n0h50001aosnh9x1d3x0.png",
						link: "https://jacoblincool.github.io/avatars/",
					},
					{
						image: "https://jacoblin.cool/avatars/watercolor/watercolor_clapk45uk0009rfsn1n83fmvf.png",
						link: "https://jacoblincool.github.io/avatars/",
					},
					{
						image: "https://github.com/JacobLinCool/rainbow-smoke/raw/main/img/creation-1649422284/creation-1649422284.png",
						link: "https://github.com/JacobLinCool/rainbow-smoke",
					},
					{
						image: "https://media.githubusercontent.com/media/JacobLinCool/create-3d-icon/main/examples/LogosGithub.png",
						link: "https://github.com/JacobLinCool/create-3d-icon",
					},
					{
						image: "https://jacoblin.cool/avatars/purple-boy/purple-boy_clas7mjr70004cmsn6bnme5j1.png",
						link: "https://jacoblincool.github.io/avatars/",
					},
					{
						image: "https://jacoblin.cool/avatars/sketch/sketch_claptd8p40009xosnci5x5aap.png",
						link: "https://jacoblincool.github.io/avatars/",
					},
					{
						image: "https://leetcard.jacoblin.cool/JacobLinCool?theme=nord&font=Dancing%20Script",
						link: "https://leetcard.jacoblin.cool/",
					},
					{
						image: "https://github.com/JacobLinCool/TheatreX/raw/main/packages/theatrex/static/theatrex-banner.png",
						link: "https://github.com/JacobLinCool/TheatreX",
					},
				],
			},
			{
				block: "iframe",
				permission: 0,
				src: "https://jacoblincool-tiktoken-calculator.hf.space",
				height: 685,
			},
		],
		background: "https://storage.jacoblin.cool/unicourse-bg.png",
	};

	let done = 0;
	console.time("load blocks");
	$: if (done === profile.blocks.length) {
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
</script>

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
