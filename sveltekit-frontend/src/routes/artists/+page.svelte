<script lang="ts">
    import type { PageProps } from './$types';
    const { data }: PageProps = $props();

    const artists = $derived(data.artists);
    const pagination = $derived(data.pagination);

    const windowSize = 5;
    const half = Math.floor(windowSize / 2);

    /* reactive แบบ runes */
    const current = $derived(pagination?.current_page ?? 1);
    const last = $derived(pagination?.last_page ?? 1);

    const start = $derived(
        Math.max(1, current - half)
    );

    const end = $derived(
        Math.min(last, start + windowSize - 1)
    );

    const adjustedStart = $derived(
        Math.max(1, end - windowSize + 1)
    );

    const pages = $derived(
        Array.from(
            { length: end - adjustedStart + 1 },
            (_, i) => adjustedStart + i
        )
    );
</script>

<div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-6xl mx-auto px-6">

        <!-- Header -->
        <header class="flex items-center justify-between mb-6">
            <div>
                <h2 class="text-2xl font-bold text-gray-900">
                    Artist Management
                </h2>
                <p class="text-sm text-gray-500">
                    View system artists
                </p>
            </div>

            <a
                href="/artists/create"
                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                       bg-blue-600 text-white rounded-full 
                       hover:bg-blue-700 transition shadow-sm"
            >
                <span class="text-lg leading-none">+</span>
                เพิ่มศิลปิน
            </a>
        </header>

        <!-- List Table -->
        <div class="bg-white border rounded-lg overflow-hidden">
            <table class="w-full text-left border-collapse table-fixed">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase">
                            Artist
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y">
                    {#if artists.length > 0}
                        {#each artists as artist}
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3 overflow-hidden">
                                        {#if artist.image_path}
                                            <img
                                                src={artist.image_path}
                                                alt={artist.name}
                                                class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                            />
                                        {:else}
                                            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                                N/A
                                            </div>
                                        {/if}

                                        <a
                                            href={`/artists/${artist.id}`}
                                            class="font-semibold text-sm text-gray-900 hover:underline truncate"
                                        >
                                            {artist.name}
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    {:else}
                        <tr>
                            <td class="px-6 py-10 text-center text-gray-500">
                                No artists found.
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        {#if pagination && last > 1}
            <div class="flex items-center justify-between mt-6 text-sm text-gray-600">

                <!-- Showing -->
                <div>
                    Showing
                    <span class="font-semibold">{pagination.from}</span>
                    –
                    <span class="font-semibold">{pagination.to}</span>
                    of
                    <span class="font-semibold">{pagination.total}</span>
                    artists
                </div>

                <!-- Controls -->
                <div class="flex items-center space-x-1">

                    <!-- First -->
                    {#if current === 1}
                        <span class="px-3 py-1 text-gray-400 border rounded cursor-not-allowed">
                            « First
                        </span>
                    {:else}
                        <a
                            href="?page=1"
                            class="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                            « First
                        </a>
                    {/if}

                    <!-- Prev -->
                    {#if current === 1}
                        <span class="px-3 py-1 text-gray-400 border rounded cursor-not-allowed">
                            Prev
                        </span>
                    {:else}
                        <a
                            href={`?page=${current - 1}`}
                            class="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                            Prev
                        </a>
                    {/if}

                    <!-- Page Numbers (window = 5) -->
                    {#each pages as page}
                        {#if page === current}
                            <span class="px-3 py-1 bg-blue-600 text-white border rounded">
                                {page}
                            </span>
                        {:else}
                            <a
                                href={`?page=${page}`}
                                class="px-3 py-1 border rounded hover:bg-gray-100"
                            >
                                {page}
                            </a>
                        {/if}
                    {/each}

                    <!-- Next -->
                    {#if current === last}
                        <span class="px-3 py-1 text-gray-400 border rounded cursor-not-allowed">
                            Next
                        </span>
                    {:else}
                        <a
                            href={`?page=${current + 1}`}
                            class="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                            Next
                        </a>
                    {/if}

                    <!-- Last -->
                    {#if current === last}
                        <span class="px-3 py-1 text-gray-400 border rounded cursor-not-allowed">
                            Last »
                        </span>
                    {:else}
                        <a
                            href={`?page=${last}`}
                            class="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                            Last »
                        </a>
                    {/if}

                </div>
            </div>
        {/if}


    </div>
</div>
