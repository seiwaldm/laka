<script>
	export let data;
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

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

	// Funktion zum Löschen eines Kunden
	async function deleteAll(kundeId) {
		if (confirm('Möchtest du das Fahrzeug wirklich löschen?')) {
			await pb.collection('Kunde').delete(kundeId);
			location.reload();
		}
	}

	// Funktion zum Löschen eines Kunden mit Bestätigung
	async function deleteKunde(kundeId) {
		const confirmed = confirm(
			'Möchten Sie diesen Kunden und alle zugehörigen Fahrzeuge und Aufträge wirklich löschen?'
		);
		if (!confirmed) return;
		try {
			for (const fahrzeuge of data.fahrzeuge.items) {
				console.log(data.fahrzeuge.items);
				if (fahrzeuge.KundenID === kundeId) {
					for (const auftrag of data.auftrag.items) {
						if (auftrag.FahrzeugID === fahrzeuge.id) {
							console.log(auftrag.id);
							let auftragid = auftrag.id;
							for (const ersatzteile of data.ersatzteile.items) {
								console.log(ersatzteile.AuftragID);
								if (ersatzteile.AuftragID === auftragid) {
									await pb.collection('Ersatzteile').delete(ersatzteile.id);
									console.log(ersatzteile.id);
								}
							}
							for (const arbeitszeiten of data.arbeitszeit.items) {
								if (arbeitszeiten.AuftragID === auftrag.id) {
									await pb.collection('Arbeitszeit').delete(arbeitszeiten.id);
								}
							}
							await pb.collection('Auftrag').delete(auftrag.id);
						}
					}
					// Delete Fahrzeug
					await pb.collection('Fahrzeug').delete(fahrzeuge.id);
				}
			}
			// Delete Kunde
			await pb.collection('Kunde').delete(kundeId);
			location.reload();
		} catch (error) {
			console.error(error);
		}
	}

	// Funktion zum Aktualisieren des letzten Öffnungsdatums
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
					type="button"
					class="absolute right-0 pr-10 text-black rounded-lg"
					on:click|stopPropagation|preventDefault={() => deleteKunde(kunde.id)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') deleteKunde(kunde.id);
					}}
				>
					<iconify-icon icon="lucide:trash-2" role="img"></iconify-icon>
				</button>
			</span>
		</a>
	{/each}
	<hr />
</main>
