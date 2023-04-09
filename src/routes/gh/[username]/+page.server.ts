import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { username } = params;

	const url = `https://github.com/${username}/${username}/raw/main/portal.json`;
	try {
		const res = await fetch(url);
		const profile = await res.json();
		return { ok: true, profile };
	} catch (err) {
		console.error(err);
		return { ok: false, profile: null as any };
	}
};
