import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';
import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { DirectusSchema } from '$lib/directus/schema';

export const directus = createDirectus<DirectusSchema>(DIRECTUS_URL)
	.with(staticToken(DIRECTUS_TOKEN))
	.with(rest());