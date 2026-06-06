import { loadPage, permalinkFromParams } from '$lib/directus/pages';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const permalink = permalinkFromParams(params.page);
	const page = await loadPage(permalink);

	if (!page) {
		error(404, 'Page not found');
	}

	return { page };
};
