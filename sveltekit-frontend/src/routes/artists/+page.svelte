<script lang="ts">
    import type { PageProps } from './$types';
    const { data }: PageProps = $props();

    const artists = $derived(data.artists);
    const pagination = $derived(data.pagination);
</script>

<div class="min-h-screen bg-blue-50 py-12">
    <div class="max-w-6xl mx-auto px-6">

        <div class="flex items-center justify-between mb-10">
            <h1 class="text-2xl font-bold text-blue-900">รายชื่อศิลปิน</h1>
            <a
                href="/artists/create"
                class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
            >
                เพิ่มศิลปิน +
            </a>
        </div>

        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {#each artists as artist}
                <li>
                    <a
                        href={`/artists/${artist.id}`}
                        class="block bg-white border border-blue-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        <div class="h-48 bg-blue-100">
                            {#if artist.image_path}
                                <img
                                    src={artist.image_path}
                                    alt={artist.name}
                                    class="w-full h-full object-cover"
                                />
                            {:else}
                                <div class="w-full h-full flex items-center justify-center text-blue-400 text-sm">
                                    No Image
                                </div>
                            {/if}
                        </div>

                        <div class="p-5">
                            <h2 class="text-lg font-semibold text-blue-900 mb-2">
                                {artist.name}
                            </h2>

                            <span class="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                                Artist
                            </span>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>

        {#if pagination && pagination.last_page > 1}
            <div class="flex justify-center items-center gap-2 mt-12 flex-wrap">
                {#each pagination.links as link}
                    {#if link.page}
                        <a
                            href={`?page=${link.page}`}
                            class="px-4 py-2 rounded-lg text-sm font-medium transition
                                {link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-blue-100 hover:bg-blue-50'}"
                        >
                            {#if link.label.includes('Previous')}
                                &lt; ก่อนหน้า
                            {:else if link.label.includes('Next')}
                                ถัดไป &gt;
                            {:else}
                                {link.label}
                            {/if}
                        </a>
                    {/if}
                {/each}
            </div>
        {/if}

    </div>
</div>
