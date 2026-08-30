import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

const REQUEST_HEADERS = [
	'accept',
	'if-none-match',
	'if-modified-since',
	'if-range',
	'range'
];

const RESPONSE_HEADERS = [
	'accept-ranges',
	'cache-control',
	'content-disposition',
	'content-length',
	'content-range',
	'content-type',
	'etag',
	'expires',
	'last-modified',
	'vary'
];

async function proxyAsset({ params, request, url }: Parameters<RequestHandler>[0]): Promise<Response> {
	const assetUrl = new URL(`/assets/${encodeURIComponent(params.id)}`, DIRECTUS_URL);
	assetUrl.search = url.search;

	const headers = new Headers({ authorization: `Bearer ${DIRECTUS_TOKEN}` });
	for (const header of REQUEST_HEADERS) {
		const value = request.headers.get(header);
		if (value) headers.set(header, value);
	}

	let upstream: Response;
	try {
		upstream = await fetch(assetUrl, {
			method: request.method,
			headers
		});
	} catch {
		return new Response('Unable to fetch asset', { status: 502 });
	}

	const responseHeaders = new Headers();
	for (const header of RESPONSE_HEADERS) {
		const value = upstream.headers.get(header);
		if (value) responseHeaders.set(header, value);
	}

	return new Response(upstream.body, {
		status: upstream.status,
		statusText: upstream.statusText,
		headers: responseHeaders
	});
}

export const GET: RequestHandler = proxyAsset;
export const HEAD: RequestHandler = proxyAsset;
