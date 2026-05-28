export interface DirectusFile {
	id: string;
	filename_download?: string | null;
	title?: string | null;
	width?: number | null;
	height?: number | null;
}

export interface BlockGalleryItem {
	id: string;
	sort?: number | null;
	directus_file?: DirectusFile | string | null;
}

export interface BlockGallery {
	id: string;
	headline?: string | null;
	tagline?: string | null;
	items?: BlockGalleryItem[] | null;
}

export interface PageBlock {
	id: string;
	collection: string;
	sort?: number | null;
	hide_block?: boolean | null;
	item?: BlockGallery | null;
}

export interface Page {
	id: string;
	title: string;
	permalink: string;
	status: string;
	blocks?: PageBlock[] | null;
}

export interface DirectusSchema {
	pages: Page[];
	block_gallery: BlockGallery[];
	block_gallery_items: BlockGalleryItem[];
	directus_files: DirectusFile[];
}
