<script>
	import '../app.css';
	import logo from '../lib/logo.jpg';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import NewCustomer from '$lib/components/NewCustomer.svelte';

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;
</script>

<nav class="flex flex-col lg:flex-row lg:w-full lg:h-screen bg-neutral-300">
	<!-- Sidebar für Mobile -->
	<div class="sm:w-full bg-slate-700 px-4 py-4 flex items-center justify-between lg:hidden">
		<img src={logo} alt="Logo" class="h-14 w-14 rounded-full" />
		<p class="text-lg text-white">LaKa Radstadt</p>

		<!-- Dropdown Menu -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="bg-slate-900 text-white px-2 py-1 rounded-lg hover:bg-slate-950">
				Optionen
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="bg-white border border-gray-300 rounded-lg  mt-2 w-48">
				<DropdownMenu.Group>
					<DropdownMenu.Label class="px-4 py-2 text-gray-700 hover:bg-gray-100 ">
						Alle Daten
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Label class="px-4 py-2 text-gray-700 hover:bg-gray-100 ">
						Zuletzt verwendet
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Label
						class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
						on:click={() => (showCard = true)}
					>
						Neue Kunden
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
				</DropdownMenu.Group>
			</DropdownMenu.Content>y
		</DropdownMenu.Root>
	</div>

	<!-- Sidebar für Desktop -->
	<div
		class="hidden lg:flex flex-col w-64 text-white bg-slate-800 top-0 fixed left-0 h-full p-2 items-center"
	>
		<img src={logo} class="w-32 rounded-full mt-10" alt="foto" />
		<p class="pt-4 pb-20 text-2xl">LaKa Radstadt</p>
		<div class="flex flex-col">
			<ul>
				<li class="text-lg p-2 hover:bg-slate-900 rounded-lg">Alle Kunden</li>
				<li class="text-lg p-2 hover:bg-slate-900 rounded-lg">Zuletzt verwendet</li>
				<li
					class="text-lg p-2 hover:bg-slate-900 rounded-lg mb-4"
					on:click={() => (showCard = true)}
				>
					Neue Kunden
				</li>
				<hr />
				<li class="text-lg p-2 hover:bg-slate-900 rounded-lg mt-4">Filtern</li>
			</ul>
		</div>
	</div>

	<!-- Daten -->
	<div class="flex-1 lg:ml-64 bg-white p-4">
		<slot />
	</div>
</nav>

{#if showCard}
	<NewCustomer on:hide={() => (showCard = false)}></NewCustomer>
{/if}
