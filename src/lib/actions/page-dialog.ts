import { goto, preloadData } from '$app/navigation';
import type { Action } from 'svelte/action';

import { getPageDialogContext, type PageData } from '$lib/page-dialog/context';

const PAGE_PATHS = new Set(['/about', '/blog', '/gallery']);

function shouldNavigate(e: MouseEvent) {
	return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

export const pageLink: Action<HTMLAnchorElement> = (node) => {
	const { open } = getPageDialogContext();

	async function onClick(event: MouseEvent) {
		const href = node.getAttribute('href');
		if (!href || !PAGE_PATHS.has(href) || shouldNavigate(event)) return;

		event.preventDefault();

		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			open(result.data as PageData);
			return;
		}

		if (result.type === 'redirect') {
			goto(result.location);
			return;
		}

		goto(href);
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
		if (node.getAttribute('href') !== '/' || node.getAttribute('title') !== 'Home') return;
		if (!isOpen() || shouldNavigate(event)) return;

		event.preventDefault();
		close();
	}

	node.addEventListener('click', onClick);

	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
};
