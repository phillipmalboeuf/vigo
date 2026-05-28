import { DIRECTUS_URL } from '$env/static/private';

export function assetUrl(fileId: string): string {
	return `${DIRECTUS_URL}/assets/${fileId}`;
}
