export function isVideoFile(type: string | null | undefined): boolean {
	return type?.startsWith('video/') ?? false;
}

export function hasFileTag(tags: string[] | null | undefined, tag: string): boolean {
	return tags?.some((value) => value.toLowerCase() === tag.toLowerCase()) ?? false;
}

export function mediaOrientation(
	file: {
		width: number | null;
		height: number | null;
		type?: string | null;
		tags?: string[] | null;
	}
): 'horizontal' | 'vertical' | 'square' {
	
	if (isVideoFile(file.type) && hasFileTag(file.tags, 'vertical')) {
		return 'vertical';
	}

	if (file.width === null || file.height === null) return 'horizontal';
	if (file.width === file.height) return 'square';
	return file.height > file.width ? 'vertical' : 'horizontal';
}
