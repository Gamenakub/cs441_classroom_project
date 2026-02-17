<script lang="ts">
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();

    let price = $state(1000);
    let finalPrice = $derived(data.calculateFinalPrice(price));
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 text-center">

    <h1 class="text-3xl font-bold text-blue-900 mb-8">
        ระบบคำนวณราคาพิเศษ
    </h1>

    <div class="w-full max-w-sm space-y-6">

        <div>
            <input
                type="number"
                bind:value={price}
                class="w-full p-3 rounded-xl border border-blue-200 bg-white
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       outline-none transition text-center text-lg"
            />
        </div>

        <div class="bg-blue-100 rounded-xl py-4">
            <p class="text-sm text-blue-700 mb-1">
                ราคาหลังหักส่วนลด
            </p>
            <p class="text-2xl font-bold text-blue-900">
                {finalPrice}
            </p>
        </div>

    </div>

</div>
