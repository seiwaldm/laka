<script>
	export let data;
	import { pb } from '$lib/pocketbase.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

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
			`${fullName} ${kunde.Firma} ${kunde.Email} ${kunde.Telefonnummer} ${kunde.Strasse} ${kunde.Plz} ${kunde.Ort}`.toLowerCase();
		console.log(JSON.stringify(kunde));
		// Prüfen, ob der Suchbegriff irgendwo im Text enthalten ist
		return fullDetails.includes(searchLowerCase);
	});

	// async function createKunde() {
	// 	const kundenDaten = {
	// 		action: 'createKunde',
	// 		kundennr,
	// 		firma,
	// 		vorname,
	// 		nachname,
	// 		email,
	// 		telefonnummer,
	// 		strasse,
	// 		plz,
	// 		ort
	// 	};

	// 	try {
	// 		const response = await fetch('/create-client', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(kundenDaten)
	// 		});
	// 		const result = await response.json();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// 	console.log(kundenDaten);
	// }

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
	<!-- Mobile und Desktop Design -->

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
		<a href="/{kunde.id}" class="flex items-center gap-4 pl-4">Kunde Details</a>
		<a
			href="/{kunde.id}"
			class="flex items-center gap-4 pl-4"
			on:click={() => updateLastOpened(kunde.id)}
		>
			<iconify-icon icon="lucide-user" class="text-4xl"></iconify-icon>
			<span
				class={searchQuery &&
					`${
						// Highlight Kunden, die mit dem Suchbegriff übereinstimmen
						`${kunde.Vorname} ${kunde.Nachname}`
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						`${kunde.Firma}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.Email}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.Telefonnummer}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.Strasse}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.Plz}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.Ort}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Kennzeichen}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.FIN}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Nat_Code}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Marke}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Modell}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Erstzulassung}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.KmStand}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Hubraum}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.PS}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.KW}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Pickerl}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Farbcode}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Motorcode}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.fahrzeug.Kraftstott}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.auftrag.Autragnummer}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
						`${kunde.auftrag.Arbeiten}`.toLowerCase().includes(searchQuery.toLowerCase())
							? 'bg-gray-200'
							: ''
					}`}
			>
				{kunde.Nachname}
				{kunde.Vorname}
				{kunde.id}
				<button on:click|stopPropagation|preventDefault={() => deleteKunde(kunde.id)}
					>Löschen</button
				>
			</span>
		</a>
	{/each}
	<hr />
</main>

{JSON.stringify(filteredData)}
