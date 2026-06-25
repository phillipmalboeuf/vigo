export function isVideoFile(type: string | null | undefined): boolean {
	return type?.startsWith('video/') ?? false;
}
