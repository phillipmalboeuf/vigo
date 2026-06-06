import { directus } from '$lib/clients/directus';
import { assetUrl } from '$lib/directus/assets';
import type {
	BlockButton,
	BlockForm,
	BlockGallery,
	BlockHero,
	BlockItem,
	BlockPosts,
	BlockPricing,
	BlockRichtext,
	DirectusFile,
	Form,
	FormField,
	Page,
	PageBlock,
	Post
} from '$lib/directus/schema';
import { readItems } from '@directus/sdk';

export type ResolvedImage = {
	id: string;
	src: string;
	alt: string;
	width: number | null;
	height: number | null;
};

export type ResolvedButton = {
	id: string;
	label: string;
	href: string;
	variant: string;
};

export type ResolvedFormField = {
	id: string;
	name: string;
	type: string;
	label: string;
	placeholder: string | null;
	help: string | null;
	width: string;
	required: boolean;
	choices: { text: string; value: string }[];
};

export type ResolvedForm = {
	id: string;
	submitLabel: string;
	onSuccess: 'redirect' | 'message';
	successMessage: string | null;
	successRedirectUrl: string | null;
	fields: ResolvedFormField[];
};

export type ResolvedPost = {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	href: string;
	image: ResolvedImage | null;
	publishedAt: string | null;
};

export type ResolvedBlock =
	| {
			type: 'block_hero';
			id: string;
			background: string;
			tagline: string | null;
			headline: string | null;
			description: string | null;
			layout: string;
			image: ResolvedImage | null;
			buttons: ResolvedButton[];
	  }
	| {
			type: 'block_richtext';
			id: string;
			background: string;
			tagline: string | null;
			headline: string | null;
			content: string | null;
			alignment: string;
			image: ResolvedImage | null;
	  }
	| {
			type: 'block_gallery';
			id: string;
			background: string;
			tagline: string | null;
			headline: string | null;
			text: string | null;
			images: ResolvedImage[];
	  }
	| {
			type: 'block_form';
			id: string;
			background: string;
			tagline: string | null;
			headline: string | null;
			form: ResolvedForm;
	  }
	| {
			type: 'block_posts';
			id: string;
			background: string;
			tagline: string | null;
			headline: string | null;
			posts: ResolvedPost[];
	  }
	| {
			type: 'block_pricing';
			id: string;
			background: string;
			tagline: string | null;
			headline: string | null;
			cards: {
				id: string;
				title: string | null;
				description: string | null;
				price: string | null;
				badge: string | null;
				features: string[];
				isHighlighted: boolean;
				button: ResolvedButton | null;
			}[];
	  };

export type ResolvedPage = {
	id: string;
	title: string;
	permalink: string;
	blocks: ResolvedBlock[];
};

const pageFields = [
	'id',
	'title',
	'permalink',
	'seo',
	{
		blocks: [
			'id',
			'collection',
			'sort',
			'hide_block',
			'background',
			{
				item: {
					block_hero: [
						'id',
						'headline',
						'tagline',
						'description',
						'layout',
						{
							image: ['id', 'title', 'width', 'height']
						},
						{
							button_group: [
								'id',
								{
									buttons: [
										'id',
										'sort',
										'type',
										'label',
										'variant',
										'url',
										{ page: ['permalink'] },
										{ post: ['slug'] }
									]
								}
							]
						}
					],
					block_richtext: [
						'id',
						'headline',
						'tagline',
						'content',
						'alignment',
						{ Image: ['id', 'title', 'width', 'height'] }
					],
					block_gallery: [
						'id',
						'headline',
						'tagline',
						'text',
						{
							items: [
								'id',
								'sort',
								{ directus_file: ['id', 'title', 'width', 'height'] }
							]
						}
					],
					block_form: [
						'id',
						'headline',
						'tagline',
						{
							form: [
								'id',
								'title',
								'submit_label',
								'on_success',
								'success_message',
								'success_redirect_url',
								'is_active',
								{
									fields: [
										'id',
										'name',
										'type',
										'label',
										'placeholder',
										'help',
										'validation',
										'width',
										'choices',
										'required',
										'sort'
									]
								}
							]
						}
					],
					block_posts: ['id', 'headline', 'tagline', 'collection', 'limit'],
					block_pricing: [
						'id',
						'headline',
						'tagline',
						{
							pricing_cards: [
								'id',
								'title',
								'description',
								'price',
								'badge',
								'features',
								'is_highlighted',
								'sort',
								{
									button: [
										'id',
										'type',
										'label',
										'variant',
										'url',
										{ page: ['permalink'] },
										{ post: ['slug'] }
									]
								}
							]
						}
					]
				}
			}
		]
	}
];

function isDirectusFile(value: DirectusFile | string | null | undefined): value is DirectusFile {
	return typeof value === 'object' && value !== null && 'id' in value;
}

function isForm(value: Form | string | null | undefined): value is Form {
	return typeof value === 'object' && value !== null && 'id' in value;
}

function resolveImage(
	file: DirectusFile | string | null | undefined,
	alt = ''
): ResolvedImage | null {
	if (!isDirectusFile(file)) return null;

	return {
		id: file.id,
		src: assetUrl(file.id),
		alt: file.title ?? alt,
		width: file.width ?? null,
		height: file.height ?? null
	};
}

function resolveButton(button: BlockButton): ResolvedButton | null {
	if (!button.label) return null;

	let href = button.url ?? '#';

	if (button.type === 'page' && typeof button.page === 'object' && button.page?.permalink) {
		href = button.page.permalink;
	}

	if (button.type === 'post' && typeof button.post === 'object' && button.post?.slug) {
		href = `/blog/${button.post.slug}`;
	}

	return {
		id: button.id,
		label: button.label,
		href,
		variant: button.variant ?? 'default'
	};
}

function resolveButtons(buttons: BlockButton[] | null | undefined): ResolvedButton[] {
	return (buttons ?? [])
		.toSorted((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
		.map(resolveButton)
		.filter((button): button is ResolvedButton => button !== null);
}

function resolveFormFields(fields: FormField[] | null | undefined): ResolvedFormField[] {
	return (fields ?? [])
		.toSorted((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
		.map((field) => ({
			id: field.id,
			name: field.name,
			type: field.type,
			label: field.label ?? field.name,
			placeholder: field.placeholder ?? null,
			help: field.help ?? null,
			width: field.width ?? '100',
			required: field.required ?? false,
			choices: field.choices ?? []
		}));
}

function resolveForm(form: Form): ResolvedForm {
	return {
		id: form.id,
		submitLabel: form.submit_label ?? 'Submit',
		onSuccess: form.on_success === 'redirect' ? 'redirect' : 'message',
		successMessage: form.success_message ?? null,
		successRedirectUrl: form.success_redirect_url ?? null,
		fields: resolveFormFields(form.fields)
	};
}

function resolvePost(post: Post): ResolvedPost {
	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		description: post.description ?? null,
		href: `/blog/${post.slug}`,
		image: resolveImage(post.image, post.title),
		publishedAt: post.published_at ?? null
	};
}

function resolveGalleryImages(gallery: BlockGallery): ResolvedImage[] {
	return (gallery.items ?? [])
		.toSorted((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
		.flatMap((item) => {
			const image = resolveImage(item.directus_file);
			return image ? [image] : [];
		});
}

async function fetchPosts(limit = 6): Promise<ResolvedPost[]> {
	const posts = await directus.request(
		readItems('posts', {
			filter: { status: { _eq: 'published' } },
			sort: ['-published_at'],
			limit,
			fields: [
				'id',
				'title',
				'slug',
				'description',
				'published_at',
				{ image: ['id', 'title', 'width', 'height'] }
			]
		})
	);

	return posts.map(resolvePost);
}

async function resolveBlock(block: PageBlock): Promise<ResolvedBlock | null> {
	if (block.hide_block || !block.item) return null;

	const background = block.background ?? 'light';
	const item = block.item as BlockItem;

	switch (block.collection) {
		case 'block_hero': {
			const hero = item as BlockHero;
			const buttonGroup =
				typeof hero.button_group === 'object' ? hero.button_group : null;

			return {
				type: 'block_hero',
				id: block.id,
				background,
				tagline: hero.tagline ?? null,
				headline: hero.headline ?? null,
				description: hero.description ?? null,
				layout: hero.layout ?? 'image_right',
				image: resolveImage(hero.image, hero.headline ?? ''),
				buttons: resolveButtons(buttonGroup?.buttons)
			};
		}

		case 'block_richtext': {
			const richtext = item as BlockRichtext;

			return {
				type: 'block_richtext',
				id: block.id,
				background,
				tagline: richtext.tagline ?? null,
				headline: richtext.headline ?? null,
				content: richtext.content ?? null,
				alignment: richtext.alignment ?? 'left',
				image: resolveImage(richtext.Image, richtext.headline ?? '')
			};
		}

		case 'block_gallery': {
			const gallery = item as BlockGallery;

			return {
				type: 'block_gallery',
				id: block.id,
				background,
				tagline: gallery.tagline ?? null,
				headline: gallery.headline ?? null,
				text: gallery.text ?? null,
				images: resolveGalleryImages(gallery)
			};
		}

		case 'block_form': {
			const blockForm = item as BlockForm;
			if (!isForm(blockForm.form) || blockForm.form.is_active === false) return null;

			return {
				type: 'block_form',
				id: block.id,
				background,
				tagline: blockForm.tagline ?? null,
				headline: blockForm.headline ?? null,
				form: resolveForm(blockForm.form)
			};
		}

		case 'block_posts': {
			const blockPosts = item as BlockPosts;
			const posts = await fetchPosts(blockPosts.limit ?? 6);

			return {
				type: 'block_posts',
				id: block.id,
				background,
				tagline: blockPosts.tagline ?? null,
				headline: blockPosts.headline ?? null,
				posts
			};
		}

		case 'block_pricing': {
			const pricing = item as BlockPricing;

			return {
				type: 'block_pricing',
				id: block.id,
				background,
				tagline: pricing.tagline ?? null,
				headline: pricing.headline ?? null,
				cards: (pricing.pricing_cards ?? [])
					.toSorted((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
					.map((card) => ({
						id: card.id,
						title: card.title ?? null,
						description: card.description ?? null,
						price: card.price ?? null,
						badge: card.badge ?? null,
						features: card.features ?? [],
						isHighlighted: card.is_highlighted ?? false,
						button:
							typeof card.button === 'object' && card.button
								? resolveButton(card.button)
								: null
					}))
			};
		}

		default:
			return null;
	}
}

export async function loadPage(permalink: string): Promise<ResolvedPage | null> {
	const [page] = (await directus.request(
		readItems('pages', {
			filter: {
				permalink: { _eq: permalink },
				status: { _eq: 'published' }
			},
			limit: 1,
			fields: pageFields as never,
			deep: {
				blocks: {
					_filter: { hide_block: { _eq: false } },
					_sort: ['sort']
				}
			}
		})
	)) as Page[];

	if (!page) return null;

	const blocks = (
		await Promise.all((page.blocks ?? []).map(resolveBlock))
	).filter((block): block is ResolvedBlock => block !== null);

	return {
		id: page.id,
		title: page.title,
		permalink: page.permalink,
		blocks
	};
}

export function permalinkFromParams(page: string | string[] | undefined): string {
	if (!page) return '/';
	const segments = Array.isArray(page) ? page : [page];
	return `/${segments.join('/')}`;
}
