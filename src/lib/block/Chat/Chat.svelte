<script lang="ts">
	import { spacing } from "pangu";
	import { t } from "svelte-i18n";
	import SvelteMarkdown from "svelte-markdown";
	import Icon from "@iconify/svelte";
	import ErrorBlock from "../Error/Error.svelte";
	import Link from "./Link.svelte";

	export let block: ChatBlock;

	let greeting = block.greeting || $t("chat.greeting");
	let messages: string[] = [
		greeting
			.split("\n")
			.map((l) => l.trimEnd())
			.join("\n"),
	];
	let links: Record<string, string> = {};
	let question = "";

	let placeholder = block.placeholder || $t("chat.placeholder");

	let loading = true;
	let no_key = true;

	check_key();

	async function check_key() {
		const res = await fetch("/api/chat");
		const data = await res.json();
		if (data.ok) {
			no_key = false;
		}
		loading = false;
	}

	let composing = false;
	let asking = false;
	async function ask() {
		if (asking || composing || !question) {
			return;
		}
		asking = true;

		try {
			const res = fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messages, question }),
			});
			messages.push(
				question
					.split("\n")
					.map((l) => l.trimEnd())
					.join("\n"),
			);
			question = "";
			messages = messages;
			scroll();

			const result: { ok: boolean; answer: string; links: Record<string, string> } = await (
				await res
			).json();
			if (result.ok) {
				messages.push(
					result.answer
						.split("\n")
						.map((l) => l.trimEnd())
						.join("\n"),
				);
				links = result.links;
				messages = messages;
				scroll();
			}
		} finally {
			asking = false;
		}
	}

	function inject(line: string): string {
		for (const [key, value] of Object.entries(links)) {
			const regex = new RegExp(key, "g");
			line = line.replace(regex, value);
		}
		return spacing(line).replace(/\n+/g, "\n\n");
	}

	function scroll(): void {
		setTimeout(() => {
			const chats = [...document.querySelectorAll("#chats > div")];
			chats[chats.length - 1 - (chats.length % 2)].scrollIntoView({ behavior: "smooth" });
		}, 10);
	}
</script>

{#if !loading}
	{#if no_key}
		<ErrorBlock error="No OpenAI API Key" {block} />
	{:else}
		<div class="w-full max-h-64 overflow-auto" id="chats">
			{#each messages as msg, i}
				<div class="chat" class:chat-start={!(i % 2)} class:chat-end={i % 2}>
					<div
						class="chat-bubble"
						class:animate-pulse={i === messages.length - 1 && asking}
					>
						<SvelteMarkdown source={inject(msg)} renderers={{ link: Link }} />
					</div>
				</div>
			{/each}
		</div>

		<div class="form-control w-full p-2">
			<div class="input-group">
				<input
					class="input input-bordered w-full"
					type="text"
					bind:value={question}
					{placeholder}
					disabled={asking}
					on:keydown={(evt) => {
						if (evt.key === "Enter") {
							ask();
						} else if (evt.key === "Tab" && !question && !composing) {
							question = placeholder;
							evt.preventDefault();
						}
					}}
					on:compositionstart={() => (composing = true)}
					on:compositionend={() => (composing = false)}
				/>
				<button class="btn btn-square text-xl" on:click={ask} disabled={asking}>
					<Icon icon="carbon:send-alt-filled" />
				</button>
			</div>
		</div>
	{/if}
{/if}