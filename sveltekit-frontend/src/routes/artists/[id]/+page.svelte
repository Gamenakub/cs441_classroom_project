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

<div class="min-h-screen bg-gray-50 py-10">
	<div class="max-w-6xl mx-auto px-6">

		<!-- Header -->
		<div class="mb-6">
			<h1 class="text-2xl font-semibold text-gray-800">
				{artist.name}
			</h1>
			<p class="text-sm text-gray-500 mt-1">
				Artist details
			</p>
		</div>

		<!-- Card -->
		<div class="bg-white border border-gray-300 rounded-lg overflow-hidden">

			<div class="grid grid-cols-1 md:grid-cols-4">

				<!-- Left: Image -->
				<div class="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-200">

					<div class="w-32 h-32 mb-4">
						{#if artist.image_path}
							<img
								src={artist.image_path}
								alt={artist.name}
								class="w-full h-full rounded-full object-cover border border-gray-300"
							/>
						{:else}
							<div
								class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center
									   text-gray-500 text-3xl font-semibold">
								{artist.name.charAt(0).toUpperCase()}
							</div>
						{/if}
					</div>

					<div class="text-sm font-semibold text-gray-800 text-center">
						{artist.name}
					</div>

					<div class="text-xs text-gray-500 mt-1 text-center break-all">
						ID: {artist.id}
					</div>
				</div>

				<!-- Right: Info -->
				<div class="md:col-span-3 p-6">

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

						<div>
							<label class="block text-sm font-medium text-gray-600 mb-1">
								Name
							</label>
							<input
								value={artist.name}
								disabled
								class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
									   bg-gray-50 text-gray-700 cursor-not-allowed"
							/>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-600 mb-1">
								Image Source
							</label>
							<input
								value={artist.image_path ?? '-'}
								disabled
								class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
									   bg-gray-50 text-gray-700 cursor-not-allowed"
							/>
						</div>

					</div>

				</div>
			</div>

			<!-- Footer Actions -->
			<div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">

				<a
					href={`/artists/${artist.id}/edit`}
					class="px-4 py-2 text-sm border border-gray-300 rounded-md
						   hover:bg-gray-50 transition"
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
						class="px-5 py-2 text-sm font-medium bg-red-600 text-white rounded-md
							   hover:bg-red-700 disabled:bg-red-400 transition"
					>
						{isDeleting ? 'Deleting...' : 'Delete'}
					</button>
				</form>

			</div>

		</div>

	</div>
</div>
