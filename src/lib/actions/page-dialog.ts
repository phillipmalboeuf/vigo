import { goto } from '$app/navigation';
import type { Action } from 'svelte/action';

import { getPageDialogContext, type PageData } from '$lib/page-dialog/context';
import { PAGE_PATH_SET } from '$lib/page-dialog/paths';

function shouldNavigate(e: MouseEvent) {
	return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

function homeHash(href: string | null) {
	if (!href) return null;
	const match = href.match(/^\/#(.+)$/);
	return match?.[1] ?? null;
}

export function openLink(
	open: (href: string, data: PageData) => void,
	getPageData: (href: string) => PageData | undefined,
	href: string
) {
	const data = getPageData(href);

	if (data) {
		open(href, data);
		return;
	}

	goto(href);
}

export const pageLink: Action<HTMLAnchorElement> = (node) => {
	const { open, getPageData } = getPageDialogContext();

	function onClick(event: MouseEvent) {
		const href = node.getAttribute('href');
		if (!href || !PAGE_PATH_SET.has(href) || shouldNavigate(event)) return;

		event.preventDefault();
		openLink(open, getPageData, href);
	}

	node.addEventListener('click', onClick);

	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
};

export const homeLink: Action<HTMLAnchorElement> = (node) => {
	const { close, isOpen } = getPageDialogContext();

	function onClick(event: MouseEvent) {
		const href = node.getAttribute('href');
		const galleryId = homeHash(href);
		const isPlainHome = href === '/' && node.getAttribute('title') === 'Home';

		if (!isPlainHome && !galleryId) return;
		if (!isOpen() || shouldNavigate(event)) return;

		event.preventDefault();
		close(galleryId ?? undefined);
	}

	node.addEventListener('click', onClick);

	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
};
