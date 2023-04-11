export async function discord(
	webhook: string,
	body: {
		on: string;
		event: string;
		data: Record<string, any>;
		visitor: number;
	},
): Promise<void> {
	await fetch(webhook, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: "Portal",
			avatar_url: "https://portal.csie.cool/favicon.png",
			embeds: [
				{
					author: { name: body.on, url: body.on },
					title: body.event,
					fields: Object.entries(body.data).map(([key, value]) => ({
						name: key,
						value: "`" + JSON.stringify(value).replace(/`/g, "\\`") + "`",
					})),
					color: body.visitor,
					footer: { text: body.visitor.toString() },
				},
			],
		}),
	});
}
