import { fail, error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	try {
		const response = await apiClient.get(`/artists/${id}`);
		return {
			artist: response.data.data
		};
	} catch (err: any) {
		throw error(404, 'ไม่พบข้อมูลศิลปิน');
	}
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = params.id;
		const formData = await request.formData();

		const newFormData = new FormData();

		for (const [key, value] of formData.entries()) {
			newFormData.append(key, value as Blob | string);
		}

		newFormData.append('_method', 'PUT');

		try {
			await apiClient.post(
				`/artists/${id}`,
				newFormData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);

		} catch (err: any) {
			if (err.response?.status === 422) {
				const data = Object.fromEntries(formData);
				delete data.image;

				return fail(422, {
					errors: err.response.data.errors,
					data
				});
			}
		}

		throw redirect(303, `/artists/${id}`);
	}
};
