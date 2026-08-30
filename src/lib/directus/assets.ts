export function assetUrl(fileId: string): string {
	return `/api/assets/${encodeURIComponent(fileId)}`;
}
