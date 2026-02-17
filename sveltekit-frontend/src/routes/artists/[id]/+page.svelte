<script lang="ts">
	import type { PageProps, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();
	let artist = $derived(data.artist);

	let isDeleting = $state(false);

	const handleDelete: SubmitFunction = ({ cancel }) => {
		const confirmed = confirm(`คุณแน่ใจหรือไม่ที่จะลบ "${artist.name}"?`);
		if (!confirmed) {
			cancel();
			return;
		}

		isDeleting = true;

		return async ({ update }) => {
			await update();
			isDeleting = false;
		};
	};
</script>

<div class="min-h-screen bg-blue-50 py-16 px-6">
	<div class="max-w-5xl mx-auto">
		<div class="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">

			<div class="flex flex-col md:flex-row">

				<div class="w-full md:w-96 bg-blue-100">
					{#if artist.image_path}
						<img
							src={artist.image_path}
							alt={artist.name}
							class="w-full h-80 md:h-full object-cover"
						/>
					{:else}
						<div class="w-full h-80 flex items-center justify-center text-blue-400 text-sm">
							No Image
						</div>
					{/if}
				</div>

				<div class="flex-1 p-10 flex flex-col justify-between">

					<div>
						<div class="flex justify-between items-start mb-6">
							<div>
								<h1 class="text-3xl font-bold text-blue-900 mb-2">
									{artist.name}
								</h1>
								<span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
									Artist
								</span>
							</div>

							<span class="text-xs text-blue-400 bg-blue-50 px-2 py-1 rounded border border-blue-100">
								ID: {artist.id}
							</span>
						</div>

						<div class="border-t border-blue-100 pt-6">
							<p class="text-xs text-blue-400 break-all">
								<span class="font-medium text-blue-600">Source:</span>
								{artist.image_path ?? '-'}
							</p>
						</div>
					</div>

					<div class="mt-10 flex gap-4">
						<a
							href={`/artists/${artist.id}/edit`}
							class="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-md"
						>
							Edit
						</a>

						<form
							action="?/delete"
							method="POST"
							use:enhance={handleDelete}
						>
							<button
								type="submit"
								disabled={isDeleting}
								class="px-5 py-2.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 disabled:bg-blue-50 transition"
							>
								{isDeleting ? 'Deleting...' : 'Delete'}
							</button>
						</form>
					</div>

				</div>
			</div>

		</div>
	</div>
</div>
