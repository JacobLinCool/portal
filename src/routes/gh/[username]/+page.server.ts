import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
	return fetch(`/api/profile/gh/${params.username}`).then((r) => r.json());
};
