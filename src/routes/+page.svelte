<script>
	export let data;
	import { pb } from '$lib/pocketbase.js';

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

	// Funktion zum Abrufen der Daten aus PocketBase
	async function fetchData() {
		try {
			const response = await fetch('https://deine-pocketbase-url/api/collections/kunden/records');
			const result = await response.json();
			if (result && result.items) {
				// Alle Kunden-Daten werden in filteredData gespeichert
				filteredData = result.items;
			}
		} catch (error) {
			console.error('Fehler beim Abrufen der Daten:', error);
		}
	}

	// Filtert die Kunden basierend auf dem Suchbegriff
	$: filteredData = data.kunden.filter((kunde) => {
		const searchLowerCase = searchQuery.toLowerCase();

		// Alle Felder durchsuchen (Vorname, Nachname, Firma, E-Mail, etc.)
		const fullName = `${kunde.Vorname} ${kunde.Nachname}`.toLowerCase();
		const fullDetails =
			`${fullName} ${kunde.Firma} ${kunde.Email} ${kunde.Telefonnummer} ${kunde.Strasse} ${kunde.Plz} ${kunde.Ort} ${kunde.fahrzeuge.Kennzeichen} ${kunde.fahrzeuge.FIN} ${kunde.fahrzeuge.Nat_Code}	${kunde.fahrzeuge.Marke}	${kunde.fahrzeuge.Modell} ${kunde.fahrzeuge.Erstzulassung} ${kunde.fahrzeuge.KmStand} 	${kunde.fahrzeuge.Hubraum} ${kunde.fahrzeuge.PS} 	${kunde.fahrzeuge.KW} ${kunde.fahrzeuge.Pickerl} 	${kunde.fahrzeuge.Farbcode} 	${kunde.fahrzeuge.Motorcode} ${kunde.fahrzeuge.Kraftstott} `.toLowerCase();
		console.log(JSON.stringify(kunde));

		// Prüfen, ob der Suchbegriff irgendwo im Text enthalten ist
		return fullDetails.includes(searchLowerCase);
	});

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

	<h1 class=" my-5 pl-2 text-2xl font-bold">Alle Kunden</h1>

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

<!-- {JSON.stringify(filteredData)} -->
