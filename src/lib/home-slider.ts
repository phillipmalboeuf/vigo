import type { EmblaCarouselType } from 'embla-carousel';

let outerApi: EmblaCarouselType | undefined;
const galleryIndexById = new Map<string, number>();
let pendingGalleryId: string | null = null;

export function registerHomeSlider(api: EmblaCarouselType, galleryIds: string[]) {
	outerApi = api;
	galleryIndexById.clear();
	for (const [index, id] of galleryIds.entries()) {
		galleryIndexById.set(id, index);
	}

	if (pendingGalleryId) {
		scrollToGallery(pendingGalleryId);
	}
}

export function unregisterHomeSlider() {
	outerApi = undefined;
	galleryIndexById.clear();
}

export function queueGalleryScroll(galleryId: string) {
	pendingGalleryId = galleryId;
	if (outerApi) {
		scrollToGallery(galleryId);
	}
}

export function scrollToGallery(galleryId: string) {
	const index = galleryIndexById.get(galleryId);
	if (index === undefined || !outerApi) return false;

	outerApi.scrollTo(index, true);
	pendingGalleryId = null;
	return true;
}

export function scrollToGalleryFromHash() {
	if (typeof window === 'undefined') return;
	const galleryId = window.location.hash.slice(1);
	if (!galleryId) return;
	scrollToGallery(galleryId);
}
