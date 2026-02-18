<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData, SubmitFunction } from './$types';

	const { data, form }: { data: PageData; form: ActionData } = $props();
	const { artist } = data;

	let previewUrl: string | null = $state(artist.image_path);
	let isSubmitting = $state(false);

	const handleFileChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.files?.[0]) {
			previewUrl = URL.createObjectURL(input.files[0]);
		}
	};

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	};
</script>

<div class="min-h-screen bg-gray-50 py-10">
	<div class="max-w-2xl mx-auto px-6">

		<!-- Header -->
		<div class="mb-6">
			<h1 class="text-2xl font-semibold text-gray-800">
				Edit Artist
			</h1>
			<p class="text-sm text-gray-500 mt-1">
				Update artist information
			</p>
		</div>

		<!-- Card -->
		<div class="bg-white border border-gray-300 rounded-lg overflow-hidden">

			<form
				method="POST"
				enctype="multipart/form-data"
				use:enhance={handleSubmit}
			>

				<div class="p-6 space-y-6">

					<!-- Name -->
					<div>
						<label class="block text-sm font-medium text-gray-600 mb-1">
							Artist Name
						</label>

						<input
							type="text"
							name="name"
							disabled={isSubmitting}
							value={form?.data?.name ?? artist.name}
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
							focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
							{form?.errors?.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}"
						/>

						{#if form?.errors?.name}
							<p class="text-xs text-red-600 mt-1">
								{form.errors.name[0]}
							</p>
						{/if}
					</div>

					<!-- Image -->
					<div>
						<label class="block text-sm font-medium text-gray-600 mb-1">
							Profile Image
						</label>

						<div class="flex flex-col items-center gap-4 mb-4">

							{#if previewUrl}
								<img
									src={previewUrl}
									alt="Preview"
									class="w-28 h-28 object-cover rounded-full border border-gray-300"
								/>
							{:else}
								<div
									class="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center
										   text-gray-500 text-sm border border-gray-300">
									No Image
								</div>
							{/if}

						</div>

						<input
							type="file"
							name="image"
							accept="image/*"
							onchange={handleFileChange}
							disabled={isSubmitting}
							class="w-full text-sm text-gray-700
							file:mr-4 file:py-2 file:px-4
							file:rounded-md file:border file:border-gray-300
							file:bg-gray-50 file:text-gray-700
							hover:file:bg-gray-100 transition"
						/>

						{#if form?.errors?.image}
							<p class="text-xs text-red-600 mt-1">
								{form.errors.image[0]}
							</p>
						{/if}
					</div>

					{#if form?.message}
						<div class="p-3 bg-red-100 text-red-700 rounded-md text-sm">
							{form.message}
						</div>
					{/if}

				</div>

				<!-- Footer -->
				<div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">

					<a
						href={`/artists/${artist.id}`}
						class="px-4 py-2 text-sm border border-gray-300 rounded-md
							   hover:bg-gray-50 transition"
					>
						Cancel
					</a>

					<button
						type="submit"
						disabled={isSubmitting}
						class="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md
							   hover:bg-blue-700 disabled:bg-blue-400 transition"
					>
						{isSubmitting ? 'Updating...' : 'Update Artist'}
					</button>

				</div>

			</form>

		</div>

	</div>
</div>
