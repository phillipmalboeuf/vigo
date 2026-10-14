import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private';
import { directus } from '$lib/clients/directus';
import type { DirectusFile } from '$lib/directus/schema';
import { createField, readFieldsByCollection, updateFile } from '@directus/sdk';
import { encode } from 'blurhash';
import sharp from 'sharp';

const ENCODE_WIDTH = 480;
const COMPONENT_X = 4;
const COMPONENT_Y = 3;

const queued = new Set<string>();
const queue: DirectusFile[] = [];
let draining = false;
let fieldsReady: Promise<void> | null = null;

const BLURHASH_FIELDS = [
	{
		field: 'blurhash',
		type: 'string',
		meta: {
			interface: 'input',
			readonly: true,
			hidden: false,
			note: 'BlurHash placeholder'
		}
	},
	{
		field: 'blurhash_filename_disk',
		type: 'string',
		meta: {
			interface: 'input',
			readonly: true,
			hidden: true,
			note: 'filename_disk used to generate the BlurHash'
		}
	}
];

function needsBlurhash(file: DirectusFile): boolean {
	if (file.type && !file.type.startsWith('image/')) return false;
	if (!file.blurhash) return true;
	return (file.blurhash_filename_disk ?? null) !== (file.filename_disk ?? null);
}

export function scheduleBlurhash(file: DirectusFile): void {
	if (!needsBlurhash(file)) return;
	if (queued.has(file.id)) return;

	queued.add(file.id);
	queue.push(file);
	kick();
}

function kick(): void {
	if (draining) return;
	draining = true;
	void drain();
}

async function drain(): Promise<void> {
	while (queue.length > 0) {
		const file = queue.shift();
		if (!file) break;

		try {
			await encodeAndSave(file);
		} catch (error) {
			console.error(`BlurHash failed for file ${file.id}`, error);
		} finally {
			queued.delete(file.id);
		}

		await new Promise((resolve) => setImmediate(resolve));
	}

	draining = false;
	if (queue.length > 0) kick();
}

export function ensureBlurhashFields(): Promise<void> {
	if (!fieldsReady) {
		fieldsReady = createMissingFields().catch((error: unknown) => {
			fieldsReady = null;
			throw error;
		});
	}

	return fieldsReady;
}

async function createMissingFields(): Promise<void> {
	const existing = await directus.request(readFieldsByCollection('directus_files'));
	const names = new Set(existing.map((field) => field.field));

	for (const definition of BLURHASH_FIELDS) {
		if (names.has(definition.field)) continue;

		await directus.request(
			createField('directus_files', {
				field: definition.field,
				type: definition.type,
				schema: { is_nullable: true },
				meta: { ...definition.meta }
			})
		);
	}
}

async function encodeAndSave(file: DirectusFile): Promise<void> {
	await ensureBlurhashFields();

	const assetUrl = new URL(`/assets/${encodeURIComponent(file.id)}`, DIRECTUS_URL);
	assetUrl.searchParams.set('width', String(ENCODE_WIDTH));
	assetUrl.searchParams.set('format', 'webp');
	assetUrl.searchParams.set('fit', 'inside');
	assetUrl.searchParams.set('withoutEnlargement', 'true');

	const response = await fetch(assetUrl, {
		headers: { authorization: `Bearer ${DIRECTUS_TOKEN}` }
	});

	if (!response.ok) {
		throw new Error(`Asset fetch failed (${response.status})`);
	}

	const buffer = Buffer.from(await response.arrayBuffer());
	const { data, info } = await sharp(buffer)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const pixels = new Uint8ClampedArray(data);
	const blurhash = encode(pixels, info.width, info.height, COMPONENT_X, COMPONENT_Y);

	await directus.request(
		updateFile(file.id, {
			blurhash,
			blurhash_filename_disk: file.filename_disk ?? null
		})
	);
}
