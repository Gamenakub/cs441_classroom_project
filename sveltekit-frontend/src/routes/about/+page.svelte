<script lang="ts">
    import { globalCounter } from "$lib/stores/counter.svelte";

    function updateCounter() {
        globalCounter.increment();
    }
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 text-center">

    <h1 class="text-4xl font-bold text-blue-900 mb-4">
        About Me
    </h1>

    <button
        on:click={updateCounter}
        class="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold
               hover:bg-blue-700 active:scale-95 transition shadow-md"
    >
        Click
    </button>

</div>
