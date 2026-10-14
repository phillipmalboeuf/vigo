import { directus } from '$lib/clients/directus';
import { assetUrl } from '$lib/directus/assets';
import {
	directusFileFields,
	type BlockGallery,
	type DirectusFile,
	type PageBlock
} from '$lib/directus/schema';
import { ensureBlurhashFields, scheduleBlurhash } from '$lib/server/blurhash';
import { readItems } from '@directus/sdk';
import type { PageServerLoad } from './$types';

const homeGalleryFileFields = [...directusFileFields, 'filename_download', 'tags'] as const;

export type HomeGalleryImage = {
	id: string;
	title: string | null;
	type: string | null;
	width: number | null;
	height: number | null;
	tags: string[];
	src: string;
	blurhash: string | null;
};

export type HomeGallery = {
	id: string;
	sort: number;
	headline: string | null;
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

			scheduleBlurhash(item.directus_file);

			return [
				{
					id: item.directus_file.id,
					title: item.directus_file.title ?? null,
					type: item.directus_file.type ?? null,
					width: item.directus_file.width ?? null,
					height: item.directus_file.height ?? null,
					tags: item.directus_file.tags ?? [],
					src: assetUrl(item.directus_file.id),
					blurhash: item.directus_file.blurhash ?? null
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
		images: toGalleryImages(block.item)
	};
}

export const load: PageServerLoad = async () => {
	await ensureBlurhashFields();

	const [gallery] = await directus.request(
		readItems('pages', {
			filter: {
				permalink: { _eq: '/gallery' },
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
									{
										items: [
											'id',
											'sort',
											{
												directus_file: homeGalleryFileFields
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

	const galleries = (gallery?.blocks ?? [])
		.map(toHomeGallery)
		.filter((gallery): gallery is HomeGallery => gallery !== null);

	return { galleries };
};
