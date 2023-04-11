import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
	try {
		let profile: Profile;

		const s = Date.now();
		if (params.src === "gh") {
			profile = await load_gh(params.id);
		} else {
			throw new Error("Unknown Source: " + params.src);
		}
		console.log(`profile ${params.src}/${params.id}: ${Date.now() - s}ms`);

		return json({ ok: true, profile });
	} catch (err) {
		console.error(err);
		return json({ ok: false, profile: null });
	}
};

async function load_gh(username: string): Promise<Profile> {
	const url = `https://raw.githubusercontent.com/${username}/${username}/main/portal.json`;
	const res = await fetch(url);
	const profile = await res.json();
	return profile;
}
