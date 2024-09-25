import { env } from "$env/dynamic/private";
import type {
	ChatCompletionRequestMessage,
	CreateChatCompletionRequest,
	CreateChatCompletionResponse,
} from "openai";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
	if (env.OPENAI_API_KEY) {
		return json({ ok: true });
	} else {
		return json({ ok: false });
	}
};

export const POST: RequestHandler = async ({ request, fetch }) => {
	try {
		const referer = request.headers.get("referer") || "";
		const origin = request.headers.get("origin") || "";
		if (!referer || !origin) {
			return json({ ok: false });
		}

		const body: { messages: string[]; question: string } = await request.json();

		const [src, id] = referer.slice(origin.length).split("/").filter(Boolean);

		const { ok, profile }: { ok: boolean; profile: Profile } = await fetch(
			`/api/profile/${src}/${id}`,
		).then((r) => r.json());
		if (!ok) {
			throw new Error("Failed to load profile");
		}
		const subblocks = profile.blocks
			.filter((b) => b.permission === 0)
			.map((b) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { block, permission, ...rest } = b;
				return rest;
			});
		const links = new Map<string, string>();
		strip(subblocks, links);

		const head_block = profile.blocks.find((b) => b.block === "head") as HeadBlock | undefined;
		const owner = head_block?.display || "the profile owner";

		const messages: ChatCompletionRequestMessage[] = [
			{
				role: "system",
				content:
					"## Profile ##\n" +
					JSON.stringify(subblocks) +
					"\n\n" +
					`## Rules ##\n* Answer in less than 50 words.\n* PortalGPT can reply with links like #link5#.\n* Use markdown.\n\n`,
			},
			{
				role: "user",
				content: `You are helping me to understand ${owner}. You should refuse to reply questions that are not related to ${owner} or PortalGPT.`,
			},
			{
				role: "assistant",
				content: `OK!`,
			},
			{
				role: "user",
				content: "Who are you?",
			},
			{
				role: "assistant",
				content: `I am PortalGPT, the assistant of [${owner}](${referer.slice(0, 80)}).`,
			},
			{
				role: "user",
				content: "Write some example code",
			},
			{
				role: "assistant",
				content: "You should ask my poor friend ChatGPT to do that!",
			},
			{
				role: "user",
				content: "What is dynamic programming?",
			},
			{
				role: "assistant",
				content: `Your question is not related to ${owner}. You should ask my friend ChatGPT.`,
			},
			{
				role: "user",
				content: "What is Portal?",
			},
			{
				role: "assistant",
				content: `Portal is a cool landing page service for everyone!`,
			},
			...body.messages.slice(-4).map(
				(m, i) =>
					({
						role: i % 2 ? "assistant" : "user",
						content: m,
					} as const),
			),
			{ role: "user", content: body.question.slice(0, 200) },
		];
		console.log(messages);

		const data = await chat({
			model: "gpt-4o-mini",
			temperature: 0.5,
			max_tokens: 200,
			messages,
		});
		console.log(data.usage);

		const answer = data.choices[0].message?.content;
		console.log(answer);

		return json({ ok: true, answer, links: Object.fromEntries(links.entries()) });
	} catch (err) {
		console.error(err);
		return json({ ok: false });
	}
};

function strip(
	obj: Record<string, unknown> | Record<string, unknown>[],
	extracted: Map<string, string>,
): void {
	for (const key in obj) {
		if (Array.isArray(obj)) {
			obj.forEach((o) => strip(o, extracted));
		} else if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
			delete obj[key];
		} else if (typeof obj[key] === "object") {
			strip(obj[key] as Record<string, unknown>, extracted);
		} else if (typeof obj[key] === "string") {
			try {
				const url = new URL(obj[key] as string);
				if (url.protocol.startsWith("http")) {
					const k = `#link${extracted.size}#`;
					extracted.set(k, url.href);
					obj[key] = k;
				}
			} catch {
				// nothing to do
			}
		}
	}
}

async function chat(req: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.OPENAI_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(req),
	});
	return await res.json();
}
