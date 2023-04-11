<script lang="ts">
	import Icon from "@iconify/svelte";
	import Popup from "$lib/Popup.svelte";
	import { page } from "$app/stores";
	import QRCode from "qrcode";
	import { hook1 } from "$lib/webhook";

	export let block: HeadBlock;
	export let blocks: Block[];

	let is_first = blocks[0] === block;

	function qr(node: Node) {
		QRCode.toCanvas(node, $page.url.href, {
			width: 256,
			margin: 0,
		});
		hook1("click", { type: "qrcode", value: $page.url.href });
	}

	let copied = false;
	function copy() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText($page.url.href);

			copied = true;
			setTimeout(() => (copied = false), 2000);
			hook1("click", { type: "copy", value: $page.url.href });
		}
	}
</script>

<div
	class="flex w-full flex-col items-center justify-center gap-2"
	class:-mt-12={is_first && block.share !== false}
>
	{#if block.share !== false}
		<div class="navbar">
			<div class="flex-1">
				<Popup>
					<div slot="button" class="btn-ghost btn-sm btn text-xl normal-case">
						<Icon icon="mdi:qrcode" />
					</div>
					<div slot="body" class="flex flex-col items-center justify-center">
						<canvas use:qr />
						<p class="mt-2 max-w-full overflow-auto text-sm opacity-60">
							{$page.url.href}
						</p>
					</div>
				</Popup>
			</div>
			<div class="flex-none">
				<button class="btn-ghost btn-sm btn text-xl normal-case" on:click={copy}>
					{#if copied}
						<Icon icon="mdi:check" />
					{:else}
						<Icon icon="mdi:content-copy" />
					{/if}
				</button>
			</div>
		</div>
	{/if}
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
