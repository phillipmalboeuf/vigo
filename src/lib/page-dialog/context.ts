import { getContext, setContext } from 'svelte';

import type { ResolvedPage } from '$lib/directus/pages';

const PAGE_DIALOG_KEY = Symbol('page-dialog');

export type PageData = { page: ResolvedPage };

export type PageDialogContext = {
	open: (href: string, data: PageData) => void;
	close: (galleryId?: string) => void;
	isOpen: () => boolean;
	getHref: () => string | null;
	getPageData: (href: string) => PageData | undefined;
	refreshOpenPage: () => void;
};

export function setPageDialogContext(context: PageDialogContext) {
	setContext(PAGE_DIALOG_KEY, context);
}

export function getPageDialogContext(): PageDialogContext {
	return getContext(PAGE_DIALOG_KEY);
}
