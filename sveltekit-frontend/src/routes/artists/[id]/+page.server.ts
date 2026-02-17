import { error, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import apiClient from '$lib/server/api-client';
export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	try {
		const response = await apiClient.get(`/artists/${id}`);
		if (response.status === 200) {
			return {
				artist: response.data.data
			};
		}

	} catch (err: any) {
		if (err.response.status == 404) {
			error(404, {
				message: `Artist ID ${id} Not Found`
			});
		} else {
			throw err;
		}
	}
};

export const actions: Actions = {
	delete: async ({ params }) => {
		try {
			await apiClient.delete(`/artists/${params.id}`);

		} catch (err: any) {
			return fail(500, {
				message: 'ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่'
			});
		}
		throw redirect(303, '/artists');
	}
};