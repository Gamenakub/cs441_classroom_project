<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData, ActionData } from './$types';

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

    function handleSubmit() {
        isSubmitting = true;
        return async ({ update }) => {
            await update();
            isSubmitting = false;
        };
    }
</script>

<div class="min-h-screen bg-blue-50 py-16 px-4">
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">

        <div class="px-8 py-6 border-b border-blue-100 flex justify-between items-center bg-blue-200/80">
            <h1 class="text-2xl font-bold text-blue-900">Edit Artist</h1>
            <a
                href={`/artists/${artist.id}`}
                class="text-sm text-blue-600 hover:text-blue-800 transition font-medium"
            >
                Cancel
            </a>
        </div>

        <form
            method="POST"
            enctype="multipart/form-data"
            use:enhance={handleSubmit}
            class="px-8 py-8 space-y-6"
        >
            <div>
                <label class="block text-sm font-semibold text-blue-800 mb-2">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    disabled={isSubmitting}
                    value={form?.data?.name ?? artist.name}
                    class="w-full p-3 rounded-xl border border-blue-200 bg-blue-50/40
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                    {form?.errors?.name ? 'border-red-500 bg-red-50' : ''}"
                />
                {#if form?.errors?.name}
                    <p class="text-red-500 text-sm mt-2">{form.errors.name[0]}</p>
                {/if}
            </div>

            <div>
                <label class="block text-sm font-semibold text-blue-800 mb-3">
                    Profile Image
                </label>

                <div class="flex flex-col items-center gap-4">
                    {#if previewUrl}
                        <img
                            src={previewUrl}
                            alt="Preview"
                            class="w-28 h-28 object-cover rounded-2xl shadow-md border border-blue-200"
                        />
                    {:else}
                        <div class="w-28 h-28 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-200 text-sm">
                            No Image
                        </div>
                    {/if}

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onchange={handleFileChange}
                        disabled={isSubmitting}
                        class="w-full text-sm text-blue-600
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200 transition"
                    />
                </div>

                {#if form?.errors?.image}
                    <p class="text-red-500 text-sm mt-2">{form.errors.image[0]}</p>
                {/if}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                class="w-full py-3 rounded-xl font-semibold text-white transition
                bg-blue-600 hover:bg-blue-700
                disabled:bg-blue-300 disabled:cursor-not-allowed shadow-md"
            >
                {isSubmitting ? 'Updating...' : 'Update Artist'}
            </button>
        </form>
    </div>
</div>
