import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client';

export const load: PageServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page') ?? '1';

	try {
		const response = await apiClient.get(`/artists?page=${page}`);

		if (response.status === 200) {
			return {
				artists: response.data.data,
				pagination: response.data.meta
			};
		}
	} catch (err: any) {
		console.error(err);
	}

	return {
		artists: [],
		pagination: null
	};
};
