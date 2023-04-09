<script lang="ts">
	import { t } from "svelte-i18n";
	import Icon from "@iconify/svelte";

	export let block: ChatBlock;

	let greeting = block.greeting;
	const greetings = greeting.split("\n");

	let placeholder = block.placeholder || $t("chat.placeholder");
</script>

<div class="w-full">
	<div class="chat chat-start">
		<div class="chat-bubble">
			{#if greeting}
				{#each greetings as line, i}
					{line}
					{#if i < greetings.length - 1}
						<br />
					{/if}
				{/each}
			{:else}
				Ask me something?
			{/if}
		</div>
	</div>
</div>

<div class="form-control w-full p-2">
	<div class="input-group">
		<input type="text" {placeholder} class="input input-bordered w-full" />
		<button class="btn btn-square text-xl">
			<Icon icon="carbon:send-alt-filled" />
		</button>
	</div>
</div>
