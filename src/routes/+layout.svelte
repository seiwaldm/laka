<script>
	import '../app.css';
	import logo from '../lib/logo.jpg';
</script>

<!-- sidebar menu -->
<!-- <div class="flex">
	<nav class="w-64 h-screen bg-slate-800 text-white flex flex-col items-center py-2">
		<img src={logo} class="w-32 rounded-full mt-10" alt="foto" />
		<p class="pt-4 pb-20 text-2xl">LaKa Radstadt</p>

		<ul class="">
			<li class="text-lg p-2 hover:bg-slate-900 rounded-lg">Alle Kunden</li>
			<li class="text-lg p-2 hover:bg-slate-900 rounded-lg">Zuletzt verwendet</li>
			<li class="text-lg p-2 hover:bg-slate-900 rounded-lg mb-6">Neue anlegen</li>
			<hr />
			<li class="text-lg p-2 hover:bg-slate-900 rounded-lg mt-6">Filtern</li>
		</ul>
	</nav> -->
<nav
	class="sm:w-full lg:w-64 lg:h-screen bg-slate-800 sm:px-4 sm:py-6 lg:flex-col lg:py-2 flex items-center justify-between"
>
	<img src={logo} alt="logo" class="sm:h-14 sm:w-14 lg:w-32 lg:mt-10 rounded-full" />
	<p class="lg:pt-4 lg:pb-20 lg:text-2xl">LaKa Radstadt</p>
	<button class="bg-white text-blue-500 px-2 py-2 hover:bg-gray-200">weiters</button>
</nav>

<slot />
<!-- </div> -->
