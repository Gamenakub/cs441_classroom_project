<script lang="ts">
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();

    let price = $state(1000);
    let finalPrice = $derived(data.calculateFinalPrice(price));
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center px-6">
    <div class="w-full max-w-md">

        <!-- Header -->
        <div class="mb-6 text-center">
            <h1 class="text-2xl font-semibold text-gray-800">
                ระบบคำนวณราคาพิเศษ
            </h1>
        </div>

        <!-- Card -->
        <div class="bg-white border border-gray-300 rounded-lg overflow-hidden">

            <div class="p-6 space-y-6">

                <!-- Input -->
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1 text-left">
                        ราคาเริ่มต้น
                    </label>

                    <input
                        type="number"
                        bind:value={price}
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-center
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <!-- Result -->
                <div class="border border-gray-200 rounded-md p-4 text-center bg-gray-50">
                    <p class="text-xs text-gray-500 mb-1">
                        ราคาหลังหักส่วนลด
                    </p>
                    <p class="text-xl font-semibold text-gray-800">
                        {finalPrice}
                    </p>
                </div>

            </div>

        </div>

    </div>
</div>
