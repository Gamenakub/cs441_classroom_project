<script lang="ts">
  import { page } from '$app/stores';
  
	function getLinkClass(path: string) {
		const currentPath = $page.url.pathname;
		const baseClass = 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200';

		const isActive = path === '/' ? currentPath === '/' : currentPath.startsWith(path);

		const activeClass = isActive
			? 'text-blue-700 bg-blue-100/50 shadow-sm ring-1 ring-blue-200'
			: 'text-slate-500 hover:text-slate-900 hover:bg-white/50';

		return `${baseClass} ${activeClass}`;
	}
</script>

<nav
	class="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-xl transition-all"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<a href="/" class="group flex items-center gap-2">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md transition-transform group-hover:scale-105 group-hover:rotate-3"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="m2 17 10 5 10-5" /><path
						d="m2 12 10 5 10-5"
					/></svg
				>
			</div>
			<span
				class="text-xl font-bold tracking-tight text-slate-800 transition-colors group-hover:text-blue-600"
			>
				MyBrand
			</span>
		</a>

		<ul
			class="hidden items-center gap-1 rounded-full border border-slate-200/60 bg-slate-50/50 p-1.5 backdrop-blur-sm md:flex"
		>
			<li>
				<a href="/" class={getLinkClass('/')}> Home </a>
			</li>
			<li>
				<a href="/artists" class={getLinkClass('/artists')}> Artists </a>
			</li>
			<li>
				<a href="/about" class={getLinkClass('/about')}> About </a>
			</li>
			<li>
				<a href="/shop" class={getLinkClass('/shop')}> Shop </a>
			</li>
			<li>
				<a href="/emoji-hub" class={getLinkClass('/emoji-hub')}> Emoji Hub </a>
			</li>
		</ul>

		<div class="flex items-center gap-4">
			<a
				href="/login"
				class="hidden text-sm font-semibold text-slate-500 hover:text-slate-900 md:block"
			>
				Log in
			</a>
			<a
				href="/signup"
				class="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg active:translate-y-0"
			>
				Sign up
			</a>
		</div>
	</div>
</nav>
