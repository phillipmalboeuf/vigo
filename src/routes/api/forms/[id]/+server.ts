import { directus } from '$lib/clients/directus';
import { createItem, readItem } from '@directus/sdk';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	const formId = params.id;
	const formData = await request.formData();

	const form = await directus.request(
		readItem('forms', formId, {
			fields: ['id', 'is_active', { fields: ['id', 'name', 'required'] }]
		})
	);

	if (!form?.is_active) {
		error(404, 'Form not found');
	}

	const fields = form.fields ?? [];
	const values = fields.flatMap((field) => {
		const value = formData.get(field.name);
		if (value === null || value === '') return [];

		return [
			{
				field: field.id,
				value: String(value)
			}
		];
	});

	for (const field of fields) {
		if (field.required && !formData.get(field.name)) {
			return json({ error: `${field.name} is required.` }, { status: 400 });
		}
	}

	await directus.request(
		createItem('form_submissions', {
			form: formId,
			values: {
				create: values
			}
		})
	);

	return json({ success: true });
};
