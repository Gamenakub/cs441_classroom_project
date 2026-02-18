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

<div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-2xl mx-auto px-6">

        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-semibold text-gray-800">
                Create New Artist
            </h1>
            <p class="text-sm text-gray-500 mt-1">
                Add a new artist to the system
            </p>
        </div>

        <!-- Card -->
        <div class="bg-white border border-gray-300 rounded-lg overflow-hidden">

            <form
                method="POST"
                enctype="multipart/form-data"
                use:enhance={handleSubmit}
            >

                <div class="p-6 space-y-5">

                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Artist Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            disabled={isSubmitting}
                            value={form?.data?.name ?? ''}
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

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
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
                <div class="px-6 py-4 border-t border-gray-200 flex justify-end">

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        class="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md
                               hover:bg-blue-700 disabled:bg-blue-400 transition"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Artist'}
                    </button>

                </div>

            </form>

        </div>

    </div>
</div>
