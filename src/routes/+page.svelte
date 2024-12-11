<script>
	export let data;
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	let kundennr = '';
	let firma = '';
	let vorname = '';
	let nachname = '';
	let email = '';
	let telefonnummer = '';
	let strasse = '';
	let plz = '';
	let ort = '';

	// Zustand für die Suche
	let searchQuery = '';
	let filteredData = [];

	// Filtert die Kunden basierend auf dem Suchbegriff
	$: {
		if (JSON.stringify($page.url).includes('?o=last')) {
			data.kunden = data.kunden.sort((a, b) => {
				return new Date(b.last_opend) - new Date(a.last_opend);
			});
		} else {
			data.kunden = data.kunden.sort((a, b) => {
				return a.Nachname.localeCompare(b.Nachname);
			});
		}
		filteredData = data.kunden.filter((kunde) => {
			const searchLowerCase = searchQuery.toLowerCase();
			const fullDetails = JSON.stringify(kunde).toLowerCase();
			// Prüfen, ob der Suchbegriff irgendwo im Text enthalten ist
			return fullDetails.includes(searchLowerCase);
		});
	}

	async function deleteKunde(kundeId) {
		if (confirm('Möchtest du das Fahrzeug wirklich löschen?')) {
			await pb.collection('Kunde').delete(kundeId);
			location.reload();
		}
	}

	async function updateLastOpened(kundeId) {
		const jetzt = new Date();
		try {
			await pb.collection('Kunde').update(kundeId, { last_opend: jetzt });
		} catch (error) {
			console.error('Fehler beim Aktualisieren des letzten Öffnungsdatums:', error);
		}
	}
</script>

<main>
	<!-- Suchfeld -->
	<div class="pl-4 mb-6 w-full">
		<input
			type="text"
			placeholder="Suchen..."
			class="w-full bg-gray-200 text-gray-400 p-1 rounded-lg ring-1 ring-gray-300"
			bind:value={searchQuery}
		/>
	</div>
	<hr />

	<h1 class=" my-5 pl-2 text-2xl font-bold">
		{#if JSON.stringify($page.url).includes('?o=last')}
			Zuletzt geöffnete Kunden
		{:else}
			Alle Kunden
		{/if}
	</h1>

	<!-- Kundenliste -->
	{#each filteredData as kunde (kunde.id)}
		<a
			href="/{kunde.id}"
			class="flex items-center gap-4 pl-4"
			on:click={() => updateLastOpened(kunde.id)}
		>
			<iconify-icon icon="lucide-user" class="text-4xl"></iconify-icon>
			<span class="flex items-center gap-4">
				{kunde.Nachname}
				{kunde.Vorname}

				<button
					class="absolute right-0 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
					on:click|stopPropagation|preventDefault={() => deleteKunde(kunde.id)}
				>
					Löschen
				</button>
			</span>
		</a>
	{/each}
	<hr />
</main>

{JSON.stringify($page.url)}
