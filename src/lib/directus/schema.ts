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

export interface BlockButtonPage {
	permalink: string;
}

export interface BlockButtonPost {
	slug: string;
}

export interface BlockButton {
	id: string;
	sort?: number | null;
	type?: 'page' | 'post' | 'url' | string | null;
	label?: string | null;
	variant?: string | null;
	url?: string | null;
	page?: Page | BlockButtonPage | string | null;
	post?: Post | BlockButtonPost | string | null;
}

export interface BlockButtonGroup {
	id: string;
	buttons?: BlockButton[] | null;
}

export interface BlockHero {
	id: string;
	headline?: string | null;
	tagline?: string | null;
	description?: string | null;
	layout?: 'image_left' | 'image_center' | 'image_right' | string | null;
	image?: DirectusFile | string | null;
	button_group?: BlockButtonGroup | string | null;
}

export interface BlockRichtext {
	id: string;
	headline?: string | null;
	tagline?: string | null;
	content?: string | null;
	alignment?: 'left' | 'center' | 'right' | string | null;
	Image?: DirectusFile | string | null;
}

export interface FormFieldChoice {
	text: string;
	value: string;
}

export interface FormField {
	id: string;
	name: string;
	type: string;
	label?: string | null;
	placeholder?: string | null;
	help?: string | null;
	validation?: string | null;
	width?: string | null;
	choices?: FormFieldChoice[] | null;
	required?: boolean | null;
	sort?: number | null;
}

export interface Form {
	id: string;
	title?: string | null;
	submit_label?: string | null;
	on_success?: 'redirect' | 'message' | string | null;
	success_message?: string | null;
	success_redirect_url?: string | null;
	is_active?: boolean | null;
	fields?: FormField[] | null;
}

export interface BlockForm {
	id: string;
	headline?: string | null;
	tagline?: string | null;
	form?: Form | string | null;
}

export interface BlockPosts {
	id: string;
	headline?: string | null;
	tagline?: string | null;
	collection?: string | null;
	limit?: number | null;
}

export interface BlockPricingCard {
	id: string;
	title?: string | null;
	description?: string | null;
	price?: string | null;
	badge?: string | null;
	features?: string[] | null;
	is_highlighted?: boolean | null;
	sort?: number | null;
	button?: BlockButton | string | null;
}

export interface BlockPricing {
	id: string;
	headline?: string | null;
	tagline?: string | null;
	pricing_cards?: BlockPricingCard[] | null;
}

export interface Post {
	id: string;
	title: string;
	slug: string;
	description?: string | null;
	content?: string | null;
	image?: DirectusFile | string | null;
	published_at?: string | null;
	status?: string | null;
}

export type BlockItem =
	| BlockHero
	| BlockRichtext
	| BlockGallery
	| BlockForm
	| BlockPosts
	| BlockPricing;

export interface PageBlock {
	id: string;
	collection: string;
	sort?: number | null;
	hide_block?: boolean | null;
	background?: 'light' | 'dark' | string | null;
	item?: BlockItem | null;
}

export interface Page {
	id: string;
	title: string;
	permalink: string;
	status: string;
	seo?: Record<string, unknown> | null;
	blocks?: PageBlock[] | null;
}

export interface DirectusSchema {
	pages: Page[];
	block_gallery: BlockGallery[];
	block_gallery_items: BlockGalleryItem[];
	block_hero: BlockHero[];
	block_richtext: BlockRichtext[];
	block_form: BlockForm[];
	block_posts: BlockPosts[];
	block_pricing: BlockPricing[];
	block_pricing_cards: BlockPricingCard[];
	block_button: BlockButton[];
	block_button_group: BlockButtonGroup[];
	forms: Form[];
	form_fields: FormField[];
	form_submissions: Record<string, unknown>[];
	form_submission_values: Record<string, unknown>[];
	posts: Post[];
	directus_files: DirectusFile[];
}
