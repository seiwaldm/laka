<script>
	import '../app.css';
	import logo from '../lib/logo.jpg';
</script>

<!-- sidebar menu -->
<div class="flex">
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
	</nav>

	<slot />
</div>
