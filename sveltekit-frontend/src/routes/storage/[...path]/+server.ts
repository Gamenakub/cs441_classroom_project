import { API_URL } from '$env/static/private';

export async function GET({ params }) {
	const response = await fetch(`${API_URL}/storage/${params.path}`);

	if (!response.ok) {
		return new Response('Not Found', { status: 404 });
	}

	return new Response(response.body, {
		headers: {
			'Content-Type': response.headers.get('Content-Type') ?? 'application/octet-stream'
		}
	});
}
