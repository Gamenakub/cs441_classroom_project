<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let currentPage = $state(1);

	const totalPages = Math.ceil(data.totalEmojis / data.pageSize);

	let visibleEmojis = $derived(data.getEmojisByPage(currentPage));

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}
</script>

<div class="min-h-screen bg-gray-50 py-10">
	<div class="max-w-6xl mx-auto px-6">

		<!-- Header -->
		<div class="mb-6 text-center">
			<h1 class="text-2xl font-semibold text-gray-800">
				Emoji Hub 😜
			</h1>
			<p class="text-sm text-gray-500 mt-1">
				Render แบบ Client-Side
			</p>
		</div>

		<!-- Summary -->
		<p class="mb-6 text-center text-sm text-gray-500">
			ทั้งหมด <span class="font-semibold">{data.totalEmojis}</span> ตัว |
			หน้า <span class="font-semibold">{currentPage}</span> / {totalPages}
		</p>

		<!-- Pagination Controls -->
		<div class="flex justify-center items-center gap-2 mb-8 text-sm">

			<button
				onclick={prevPage}
				disabled={currentPage === 1}
				class="px-3 py-1 border rounded
				{currentPage === 1
					? 'text-gray-400 border-gray-300 cursor-not-allowed'
					: 'hover:bg-gray-100'}"
			>
				Prev
			</button>

			<span class="px-3 py-1 bg-blue-600 text-white border rounded">
				{currentPage}
			</span>

			<button
				onclick={nextPage}
				disabled={currentPage === totalPages}
				class="px-3 py-1 border rounded
				{currentPage === totalPages
					? 'text-gray-400 border-gray-300 cursor-not-allowed'
					: 'hover:bg-gray-100'}"
			>
				Next
			</button>

		</div>

		<!-- Grid -->
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

			{#each visibleEmojis as emoji}
				<div
					class="bg-white border border-gray-300 rounded-lg p-4 text-center
						   hover:bg-gray-50 transition"
				>
					<div class="text-3xl mb-2">
						{@html emoji.htmlCode[0]}
					</div>

					<div class="text-xs text-gray-600 truncate capitalize">
						{emoji.name}
					</div>
				</div>
			{/each}

		</div>

	</div>
</div>
