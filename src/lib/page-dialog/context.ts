import { getContext, setContext } from 'svelte';

import type { PageData } from '../../routes/[...page]/$types';

const PAGE_DIALOG_KEY = Symbol('page-dialog');

export type PageDialogContext = {
	open: (href: string, data: PageData) => void;
	close: () => void;
	isOpen: () => boolean;
};

export function setPageDialogContext(context: PageDialogContext) {
	setContext(PAGE_DIALOG_KEY, context);
}

export function getPageDialogContext(): PageDialogContext {
	return getContext(PAGE_DIALOG_KEY);
}

export type { PageData };
