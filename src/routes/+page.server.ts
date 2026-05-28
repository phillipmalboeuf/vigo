import { directus } from '$lib/clients/directus';
import { assetUrl } from '$lib/directus/assets';
import type { BlockGallery, DirectusFile, PageBlock } from '$lib/directus/schema';
import { readItems } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export type HomeGalleryImage = {
	id: string;
	title: string | null;
	width: number | null;
	height: number | null;
	src: string;
};

export type HomeGallery = {
	id: string;
	sort: number;
	headline: string | null;
	tagline: string | null;
	images: HomeGalleryImage[];
};

function isDirectusFile(value: DirectusFile | string | null | undefined): value is DirectusFile {
	return typeof value === 'object' && value !== null && 'id' in value;
}

function toGalleryImages(gallery: BlockGallery): HomeGalleryImage[] {
	return (gallery.items ?? [])
		.toSorted((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
		.flatMap((item) => {
			if (!isDirectusFile(item.directus_file)) return [];

			return [
				{
					id: item.directus_file.id,
					title: item.directus_file.title ?? null,
					width: item.directus_file.width ?? null,
					height: item.directus_file.height ?? null,
					src: assetUrl(item.directus_file.id)
				}
			];
		});
}

function toHomeGallery(block: PageBlock): HomeGallery | null {
	if (block.collection !== 'block_gallery' || !block.item) return null;

	return {
		id: block.item.id,
		sort: block.sort ?? 0,
		headline: block.item.headline ?? null,
		tagline: block.item.tagline ?? null,
		images: toGalleryImages(block.item)
	};
}

export const load: PageServerLoad = async () => {
	const [home] = await directus.request(
		readItems('pages', {
			filter: {
				permalink: { _eq: '/' },
				status: { _eq: 'published' }
			},
			limit: 1,
			fields: [
				'id',
				'title',
				{
					blocks: [
						'id',
						'collection',
						'sort',
						'hide_block',
						{
							item: {
								block_gallery: [
									'id',
									'headline',
									'tagline',
									{
										items: [
											'id',
											'sort',
											{
												directus_file: [
													'id',
													'filename_download',
													'title',
													'width',
													'height'
												]
											}
										]
									}
								]
							}
						}
					]
				}
			],
			deep: {
				blocks: {
					_filter: {
						collection: { _eq: 'block_gallery' },
						hide_block: { _eq: false }
					},
					_sort: ['sort']
				}
			}
		})
	);

	const galleries = (home?.blocks ?? [])
		.map(toHomeGallery)
		.filter((gallery): gallery is HomeGallery => gallery !== null);

    console.log(galleries);

	return { galleries };
};
