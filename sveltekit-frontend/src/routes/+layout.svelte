<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import MainMenu from '$lib/components/main-menu.svelte'

	let { children } = $props();

</script>


<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<MainMenu brand="Main Menu"></MainMenu>
<main class="min-h-screen bg-blue-50">
	{@render children()}
</main>


