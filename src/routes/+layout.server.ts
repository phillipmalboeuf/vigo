import { loadPage } from '$lib/directus/pages';
import { PAGE_PATHS } from '$lib/page-dialog/paths';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const entries = await Promise.all(
		PAGE_PATHS.map(async (path) => {
			const page = await loadPage(path);
			return [path, page ? { page } : null] as const;
		})
	);

	const dialogPages = Object.fromEntries(entries.filter(([, data]) => data !== null));

	return { dialogPages };
};
