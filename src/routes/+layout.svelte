<script>
	import '../app.css';
	import logo from '../lib/logo.jpg';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import NewCustomer from '$lib/components/NewCustomer.svelte';

	// Zustand für die Sichtbarkeit der Card definieren
	let showCard = false;
</script>

<nav class="flex flex-col lg:flex-row lg:w-full lg:h-screen bg-neutral-200">
	<!-- Sidebar für Mobile -->
	<div class="sm:w-full bg-slate-700 px-4 py-4 flex items-center justify-between lg:hidden">
		<img src={logo} alt="Logo" class="h-14 w-14 rounded-full" />
		<p class="text-lg text-white font-medium">LaKa Radstadt</p>

		<!-- Dropdown Menu -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-slate-950">
				Optionen
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="bg-white border border-gray-300 rounded-lg  mt-2 w-48 shadow-lg">
				<DropdownMenu.Group>
					<DropdownMenu.Label class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
						Alle Daten
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Label class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
						Zuletzt verwendet
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Label class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
						<button on:click={() => (showCard = true)}> Neue Kunden </button>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>

	<!-- Sidebar für Desktop -->
	<div class="hidden lg:flex flex-col w-72 text-white bg-slate-800 h-full p-4 fixed items-center">
		<img src={logo} class="w-36 rounded-full mt-12" alt="foto" />
		<p class="pt-6 pb-24 text-3xl font-semibold">LaKa Radstadt</p>
		<div class="flex flex-col space-y-4">
			<ul>
				<li class="text-xl p-4 hover:bg-slate-900 cursor-pointer rounded-lg">Alle Kunden</li>
				<li class="text-xl p-4 hover:bg-slate-900 cursor-pointer rounded-lg mb-4">
					Zuletzt verwendet
				</li>
				<hr />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

				<li
					class="text-xl p-4 hover:bg-slate-900 rounded-lg cursor-pointer mt-4"
					on:click={() => (showCard = true)}
				>
					Neue Kunden
				</li>
			</ul>
		</div>
	</div>

	<!-- Daten -->
	<div class="flex-1 lg:text-lg lg:ml-72 bg-white p-6">
		<slot />
	</div>
</nav>

{#if showCard}
	<NewCustomer on:hide={() => (showCard = false)}></NewCustomer>
{/if}
