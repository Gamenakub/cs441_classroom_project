<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from './$types';
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();

    let isSubmitting = $state(false);

    const handleSubmit: SubmitFunction = () => {
        isSubmitting = true;

        return async ({ update }) => {
            await update();
            isSubmitting = false;
        };
    };
</script>

<div class="min-h-screen bg-blue-50 py-16 px-4">
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">

        <div class="px-8 py-6 border-b border-blue-100 bg-blue-200/80">
            <h1 class="text-2xl font-bold text-blue-900">Create New Artist</h1>
        </div>

        <form
            method="POST"
            enctype="multipart/form-data"
            use:enhance={handleSubmit}
            class="px-8 py-8 space-y-6"
        >
            <div>
                <label class="block mb-2 text-sm font-semibold text-blue-800">
                    Artist Name
                </label>
                <input
                    type="text"
                    name="name"
                    disabled={isSubmitting}
                    value={form?.data?.name ?? ''}
                    class="w-full p-3 rounded-xl border border-blue-200 bg-blue-50/40
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                    {form?.errors?.name ? 'border-red-500 bg-red-50' : ''}"
                />
                {#if form?.errors?.name}
                    <p class="text-red-500 text-sm mt-2">{form.errors.name[0]}</p>
                {/if}
            </div>

            <div>
                <label class="block mb-3 text-sm font-semibold text-blue-800">
                    Profile Image
                </label>

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    disabled={isSubmitting}
                    class="w-full text-sm text-blue-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-100 file:text-blue-700
                    hover:file:bg-blue-200 transition"
                />

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
                {isSubmitting ? 'Saving...' : 'Save Artist'}
            </button>

            {#if form?.message}
                <div class="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                    {form.message}
                </div>
            {/if}
        </form>

    </div>
</div>
