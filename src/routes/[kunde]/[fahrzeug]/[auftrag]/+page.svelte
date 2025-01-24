<script>
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';
	import { openCloudinaryWidgetSchaden } from '$lib/cloudinary.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { writable } from 'svelte/store';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import 'iconify-icon';
	import { onMount } from 'svelte';
	import { stringify } from 'postcss';
	// laden der Daten
	export let data;

	// Funktion zum öffnen des Cloudinary Widgets, so dass sie in icons verwendet werden kann

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;

	// Zustand für die Sichtbarkeit der Rechnung definieren
	let showAuftrag = false;

	// Zustand für die Sichtbarkeit des Bestätigungsdialogs definieren
	let showDeleteConfirm = false;

	// Zustand für die Sichtbarkeit des Formulars "Ersatzteile hinzufügen"
	let showAddPartForm = false;

	// Zustand für die Sichtbarkeit des Formulars "Arbeitsstunden hinzufügen"
	let showAddHourForm = false;

	// Variablen für die update Funktion
	let updateAuftragid = $page.params.auftrag;
	let updateArbeiten = '';
	let updateBildSchaden = '';
	let updateBildFertig = '';
	let updateRechnung = '';
	let updateFahrzeugid = $page.params.fahrzeug;
	let updateAuftragnr = '';
	let updateInfotext = '';
	let updateLieferschein = '';

	// funktion zum aktualisieren des Auftrags
	async function updateAuftrag(field, value) {
		const auftragDaten = {
			action: 'updateAuftrag',
			updateAuftragid,
			updateArbeiten,
			updateBildSchaden,
			updateBildFertig,
			updateRechnung,
			updateAuftragnr,
			updateFahrzeugid,
			updateLieferschein,
			ausgewählteZahlungsart
		};
		try {
			const response = await fetch('/update-client', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(auftragDaten)
			});
			const result = await response.json();
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(auftragDaten);
	}

	// Funktion zum zurücksetzen des Updateformulars
	function resetupdateAuftrag(){
		updateArbeiten = '';
		updateBildSchaden = '';
		updateBildFertig = '';
		updateRechnung = '';
		updateAuftragnr = '';
		updateInfotext = '';
		updateLieferschein = '';
		showEditForm = false;
	}

	let auftragsdokument = false;
	let zahlungsart = [
		{ id: 1, Zahlungsart: 'Barverkauf' },
		{ id: 2, Zahlungsart: 'Überweisung' }
	];
	let ausgewählteZahlungsart = '';

	// Funktion zum erstellen einer Rechnung (Datensatz)
	async function createRechnung() {
		const rechnungsDaten = {
			action: 'createRechnung',
			auftrag: $page.params.auftrag,
			ersatzteile: data.ersatzteile.items,
			arbeitszeit: data.arbeitszeit.items,
			auftragsdokument
		};
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				redirect: 'follow',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(rechnungsDaten)
			});
			// showRechnungLink = true;
			const result = await response.json();
			window.location.href = result.data.url;
		} catch (error) {
			console.error(error);
		}
		console.log(rechnungsDaten);
	}

	// Variablen für die Felder des Formulars Ersatzteile
	let ersatzteilArtikelnummer = '';
	let ersatzteilBezeichnung = '';
	let ersatzteilMenge = '';
	let ersatzteilRabatt = '';
	let ersatzteilVKPreisNetto = '';
	let ersatzteilEKPreis = '';
	let ersatzteilVKPreisBrutto = '';
	let auftragid = $page.params.auftrag;

	// Funktion zum Erstellen eines Ersatzteils
	async function createErsatzteil() {
		const ersatzteilDaten = {
			action: 'createErsatzteil',
			ersatzteilArtikelnummer,
			ersatzteilBezeichnung,
			ersatzteilMenge,
			ersatzteilRabatt,
			ersatzteilVKPreisNetto: parseFloat(ersatzteilVKPreisNetto),
			ersatzteilEKPreis: parseFloat(ersatzteilEKPreis),
			ersatzteilVKPreisBrutto: parseFloat(ersatzteilVKPreisBrutto),
			auftragid
		};
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(ersatzteilDaten)
			});
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(ersatzteilDaten);
	}

	// Funktion zum Zurücksetzen des Formulars Ersatzteile und ausblenden
	function resetErsatzteil() {
		ersatzteilArtikelnummer = '';
		ersatzteilBezeichnung = '';
		ersatzteilMenge = '';
		ersatzteilRabatt = '';
		ersatzteilVKPreisNetto = '';
		ersatzteilEKPreis = '';
		ersatzteilVKPreisBrutto = '';
		showAddPartForm = false;
	}

	// Variablen für die Felder des Formulars Arbeitsstunden
	let stundenArbeit = '';
	let stundenKuerzel = '';
	let stundenInfotext = '';
	let stundenMenge = '';
	let stundenRabatt = '';
	let stundenFestpreis = 0;
	let stundenNettosumme = '';
	let stundenBruttosumme = '';

	// Funktion zum Hinzufügen eines Arbeitszeit
	async function createArbeitszeit() {
		// Berechnung des Gesamtpreises
		const arbeitszeitDaten = {
			action: 'createArbeitszeit',
			stundenArbeit,
			stundenKuerzel,
			stundenInfotext,
			stundenMenge,
			stundenRabatt,
			stundenFestpreis: parseFloat(stundenFestpreis),
			stundenNettosumme: parseFloat(stundenNettosumme),
			stundenBruttosumme: parseFloat(stundenBruttosumme),
			auftragid
		};
		console.log(arbeitszeitDaten);
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(arbeitszeitDaten)
			});
			if (response.ok) {
				alert('Arbeitszeit erfolgreich hinzugefügt!');
				location.reload();
			} else {
				const error = await response.text();
				alert(`Fehler: ${error}`);
			}
		} catch (error) {
			console.error('Fehler beim Hinzufügen der Arbeitszeit:', error);
			alert('Ein unerwarteter Fehler ist aufgetreten.');
		}
	}

	async function deleteArbeitszeit(ArbeitszeitId) {
		if (confirm('Möchten Sie die Arbeitszeit wirklich löschen?')) {
			await pb.collection('Arbeitszeit').delete(ArbeitszeitId);
			location.reload();
		}
	}

	async function deleteErsatzteile(ErsatzteilId) {
		if (confirm('Möchten Sie die Arbeitszeit wirklich löschen?')) {
			await pb.collection('Ersatzteile').delete(ErsatzteilId);
			location.reload();
		}
	}

	// Funktion zum Aktualisieren des Festpreises basierend auf der Auswahl der arbeitswerte
	async function updateArbeitswerte(event) {
		const arbeitswerteID = event.target.value;

		// Sicherstellen, dass arbeitswerte vorhanden sind
		if (!data.arbeitswerte || data.arbeitswerte.length === 0) {
			console.error('Keine Arbeitswerte vorhanden');
			return;
		}
		const arbeit = data.arbeitswerte.find((item) => item.id === arbeitswerteID);
		if (arbeit) {
			stundenFestpreis = arbeit.AwPreis;
			stundenKuerzel = arbeit.Kuerzel;
		} else {
			stundenFestpreis = 0;
			stundenKuerzel = '';
		}
	}

	function resetArbeitszeit() {
		stundenArbeit = '';
		stundenKuerzel = '';
		stundenInfotext = '';
		stundenMenge = '';
		stundenRabatt = '';
		stundenFestpreis = 0;
		showAddHourForm = false;
	}

	const Auftragdaten = {
		Arbeiten: 'Arbeiten',
		Auftragnummer: 'Auftragnummer',
		BildSchaden: 'Schaden',
		BildFertig: 'Fertig',
		Infotext: 'Infotext',
		Lieferschein: 'Lieferschein',
		Rechnung: 'Rechnung'
	};

	// Funktion zum Schließen des Bestätigungsdialogs
	function cancelDelete() {
		showDeleteConfirm = false;
	}

	// Funktion zum Löschen eines Auftrages mit den dazugehörigen Ersatzteilen und Abreitiszeiten mit Bestätigung

	async function deleteAuftrag() {
		// const confirmed = confirm(
		// 	'Möchten Sie dieses Fahrzeug und alle zugehörigen und Aufträge wirklich löschen?'
		// );
		// if (!confirmed) return;
		try {
			for (const ersatzteile of data.ersatzteile.items) {
				console.log(ersatzteile.AuftragID);
				if (ersatzteile.AuftragID === $page.params.auftrag) {
					await pb.collection('Ersatzteile').delete(ersatzteile.id);
					console.log(ersatzteile.id);
				}
			}
			for (const arbeitszeiten of data.arbeitszeit.items) {
				if (arbeitszeiten.AuftragID === $page.params.auftrag) {
					await pb.collection('Arbeitszeit').delete(arbeitszeiten.id);
				}
			}
			await pb.collection('Auftrag').delete($page.params.auftrag);
		} catch (error) {
			// location.reload();
			console.error(error);
		}
	}

	let dateiURL = '';
	let dateidetailid = '';


	export async function createDatei() {
		const dateiDaten = {
			action: 'createDatei',
			dateidetailid,
			dateiURL: result.info.secure_url,
			auftragid
		
	}
}

	onMount(() => {
		ausgewählteZahlungsart = data.auftrag.Zahlungsart;
	});
</script>

<!-- Dateien auf cloudinary hochladen -->
<!-- <svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/latest/global/all.js"
		type="text/javascript"
	></script>
</svelte:head> -->

<!-- links zu den verschiedenen Seiten -->
<h1 class="text-base pl-5 flex items-center my-5">
	<!-- Mobile und Tablet Design -->
	<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block lg:hidden"></iconify-icon>
	<a href="/{$page.params.kunde}/{$page.params.fahrzeug}" class="hover:underline block lg:hidden">
		Zurück
	</a>

	<!-- Desktop Design ) -->
	<div class="hidden lg:flex items-center">
		<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/" class="hover:underline">Startseite </a>
		<iconify-icon icon="lucide:chevron-right" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/{$page.params.kunde}" class="hover:underline">Kunde {data.Nachname}</a>
		<iconify-icon icon="lucide:chevron-right" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/{$page.params.kunde}/{$page.params.fahrzeug}" class="hover:underline">
			Fahrzeug {data.fahrzeuge.Marke}
		</a>
		<iconify-icon icon="lucide:chevron-right" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		Auftrag {data.auftrag.Arbeiten}
	</div>
</h1>
<!-- Icon mit 3 Punkten für das Dropdown-Menü -->
<div class="absolute top-32 lg:top-10 right-10">
	<DropdownMenu.Root>
		<!-- Füge relative Positionierung hinzu -->
		<DropdownMenu.Trigger>
			<button class=" text-gray-600 hover:text-gray-800 text-2xl" aria-label="Options"> ⋮ </button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group class="mt-2 w-48  bg-white shadow-md rounded-md p-2">
				<!-- Neu: Bestätigungsdialog -->
				<DropdownMenu.Label class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2">
					<button on:click={() => (showDeleteConfirm = true)}>Löschen</button>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Label class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2">
					<button
						on:click={() => {
							showEditForm = true;
							showDeleteConfirm = false; // Dropdown schließt sich
						}}
					>
						Bearbeiten
					</button>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<!-- Rechnung -->
				<DropdownMenu.Label
					class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2 hidden md:block"
				>
					<button on:click={createRechnung}> Rechnung </button>
				</DropdownMenu.Label>
				<DropdownMenu.Separator class="hidden md:block" />
				<DropdownMenu.Label
					class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2 hidden md:block"
				>
					<button
						on:click={() => {
							auftragsdokument = true;
							createRechnung();
						}}>Auftrag</button
					>
				</DropdownMenu.Label>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

<!-- Bestätigungsdialog für Löschen -->
{#if showDeleteConfirm}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h2 class="text-lg font-bold">Sind Sie sicher?</h2>
			<p>Möchten Sie diesen Auftrag wirklich löschen?</p>
			<div class="mt-4 flex justify-end gap-4">
				<button
					class="text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
					on:click={cancelDelete}
				>
					Abbrechen
				</button>
				<a href="/{$page.params.kunde}/{$page.params.fahrzeug}"
					><button
						class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
						on:click={deleteAuftrag}
					>
						Löschen
					</button>
				</a>
			</div>
		</div>
	</div>
{/if}
<div class="my-5"><hr /></div>

<!-- Button zum öffnen des Cloudinary Widgets -->
<button on:click={openCloudinaryWidgetSchaden}
	><iconify-icon icon="lucide:camera"></iconify-icon></button
>

<!-- Auftraginformationen  -->
<div class="pl-5">
	<h1 class=" my-5 text-2xl font-bold">Auftraginformationen</h1>
	{#each Object.entries(data.auftrag).filter((item) => item[0] === 'Auftragnummer' || item[0] === 'Arbeiten' || item[0] === 'BildSchaden' || item[0] === 'BildFertig' || item[0] === 'Infotext' || item[0] === 'Lieferschein' || item[0] === 'Rechnung') as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<button class="mr-2" on:click={() => icons[key]?.action && icons[key].action()}>
				<iconify-icon
					icon={typeof icons[key] === 'object' ? icons[key].icon : icons[key]}
					class="mr-2 text-2xl translate-y-1"
				></iconify-icon></button
			>
			<span class="font-bold">{Auftragdaten[key]}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}
	<!-- Dateien -->
	{#if data.datei.items.length > 0}
		{#each ['Rechnung', 'Lieferschein', 'BildSchaden', 'BildFertig'] as dateiArt}
			<div class="mb-4">
				<!-- Icon und Überschrift anzeigen -->
				<div class="flex items-center ml-6">
					<button class="mr-2" on:click={() => icons[dateiArt]?.action && icons[dateiArt].action()}>
						<iconify-icon
							icon={typeof icons[dateiArt] === 'object' ? icons[dateiArt].icon : icons[dateiArt]}
							class="mr-2 text-2xl translate-y-1"
						></iconify-icon>
					</button>
					<span class="font-bold">{dateiArt}:</span>
				</div>

				<!-- Alle Links für die entsprechende Dateiart anzeigen -->
				{#each data.datei.items.filter((datei) => datei.expand.DateidetailID.Dateiart === dateiArt) as datei}
					<div class="mb-4 flex items-center relative ml-6">
						<a
							class="absolute left-48 text-blue-500 underline"
							href={datei.URL}
							target="_blank"
							rel="noopener noreferrer"
						>
							{datei.URL}
						</a>
					</div>
				{/each}
			</div>
		{/each}
	{/if}

	<!-- Unterüberschrift 1 -->
	<h2 class="text-lg font-bold mb-4">Ersatzteile</h2>
	<button
		class="ml-4 bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-3 py-1"
		on:click={() => (showAddPartForm = !showAddPartForm)}
	>
		+
	</button>
	{#if data.ersatzteile.items.length > 0}
		{#each data.ersatzteile.items as Ersatzteile (Ersatzteile.id)}
			<span class="flex items-center gap-2 leading-tight">
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{Ersatzteile.Bezeichnung}
				{Ersatzteile.Menge} Stk.
				{Ersatzteile.Bruttosumme} €

				<button
					type="button"
					class="absolute right-0 pr-10 text-black rounded-lg"
					on:click|stopPropagation|preventDefault={() => deleteErsatzteile(Ersatzteile.id)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') deleteErsatzteile(Ersatzteile.id);
					}}
				>
					<iconify-icon icon="lucide:trash-2" role="img"></iconify-icon>
				</button>
			</span>
		{/each}
	{/if}

	<!-- Unterüberschrift 2 -->
	<h2 class="text-lg font-bold mt-6 mb-4">Arbeitsstunden</h2>
	<button
		class="ml-4 bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-3 py-1"
		on:click={() => (showAddHourForm = !showAddHourForm)}
	>
		+
	</button>
	{#if data.arbeitszeit.items.length > 0}
		{#each data.arbeitszeit.items as Arbeitszeit (Arbeitszeit.id)}
			<span class="flex items-center gap-2 leading-tight">
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{Arbeitszeit.expand.ArbeitswerteID.Leistungsbezeichnung}
				{Arbeitszeit.Menge} Std.
				{Arbeitszeit.Bruttosumme} €

				<button
					type="button"
					class="absolute right-0 pr-10 text-black rounded-lg"
					on:click|stopPropagation|preventDefault={() => deleteArbeitszeit(Arbeitszeit.id)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') deleteArbeitszeit(Arbeitszeit.id);
					}}
				>
					<iconify-icon icon="lucide:trash-2" role="img"></iconify-icon>
				</button>
			</span>
		{/each}
	{/if}
</div>

<!-- Formular zum Hinzufügen eines Ersatzteils -->
{#if showAddPartForm}
	<div class="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
		<h3 class="text-lg font-semibold mb-2">Ersatzteil hinzufügen</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="ersatzteilName" class="block text-sm font-medium mb-1">Artikelnummer</label>
				<input
					id="ersatzteilArtikelnummer"
					type="text"
					bind:value={ersatzteilArtikelnummer}
					placeholder="Artikelnummer"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="ersatzteilName" class="block text-sm font-medium mb-1">Bezeichnung</label>
				<input
					id="ersatzteilName"
					type="text"
					bind:value={ersatzteilBezeichnung}
					placeholder="Ersatzteil Name"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="ersatzteilStück" class="block text-sm font-medium mb-1">Menge</label>
				<input
					id="ersatzteilStück"
					type="number"
					bind:value={ersatzteilMenge}
					placeholder="Stück"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="gesamtpreis" class="block text-sm font-medium mb-1">Marge in %</label>
				<input
					id="marge"
					type="number"
					value={(
						((ersatzteilVKPreisNetto - ersatzteilEKPreis) / ersatzteilVKPreisNetto) *
						100
					).toFixed(2)}
					placeholder="Gesamtpreis (wird berechnet)"
					class="w-full px-3 py-2 border rounded-lg bg-gray-100"
					disabled
				/>
			</div>
			<div>
				<label for="einzelpreis" class="block text-sm font-medium mb-1">Rabatt in %</label>
				<input
					id="rabatt"
					type="number"
					bind:value={ersatzteilRabatt}
					placeholder=""
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="einzelpreis" class="block text-sm font-medium mb-1">Verkaufspreis Netto</label>
				<input
					id="einzelpreis"
					type="number"
					bind:value={ersatzteilVKPreisNetto}
					placeholder="Einzelpreis"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="einzelpreis" class="block text-sm font-medium mb-1">Einkaufspreis Netto</label>
				<input
					id="einzelpreis"
					type="number"
					bind:value={ersatzteilEKPreis}
					placeholder="Einzelpreis"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="einzelpreis" class="block text-sm font-medium mb-1">Verkaufspreis Brutto</label>
				<input
					id="einzelpreis"
					type="number"
					value={parseFloat(ersatzteilVKPreisNetto * 1.2).toFixed(2)}
					placeholder="Einzelpreis"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="gesamtpreis" class="block text-sm font-medium mb-1">Nettosumme</label>
				<input
					id="gesamtpreis"
					type="number"
					value={parseFloat(
						((ersatzteilVKPreisNetto * (100 - ersatzteilRabatt)) / 100) * ersatzteilMenge
					).toFixed(2)}
					placeholder="Gesamtpreis (wird berechnet)"
					class="w-full px-3 py-2 border rounded-lg bg-gray-100"
					disabled
				/>
			</div>
			<div>
				<label for="gesamtpreis" class="block text-sm font-medium mb-1">Bruttosumme</label>
				<input
					id="gesamtpreis"
					type="number"
					value={parseFloat(
						((ersatzteilVKPreisNetto * (100 - ersatzteilRabatt)) / 100) * ersatzteilMenge * 1.2
					).toFixed(2)}
					placeholder="Gesamtpreis (wird berechnet)"
					class="w-full px-3 py-2 border rounded-lg bg-gray-100"
					disabled
				/>
			</div>
		</div>
		<div class="mt-4 flex justify-end gap-2">
			<button
				type="reset"
				class="bg-gray-300 text-black hover:bg-gray-400 rounded-lg px-4 py-2"
				on:click={resetErsatzteil}
			>
				Abbrechen
			</button>
			<button
				class="bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-4 py-2"
				on:click={createErsatzteil}
			>
				Hinzufügen
			</button>
		</div>
	</div>
{/if}
<!-- Formular zum Hinzufügen von Arbeitsstunden -->
{#if showAddHourForm}
	<div class="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
		<h3 class="text-lg font-semibold mb-2">Arbeitsstunden hinzufügen</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<!-- Arbeitname Dropdown -->
			<div>
				<label for="arbeitName" class="block text-sm font-medium mb-1">Arbeit</label>
				<select
					id="arbeitName"
					bind:value={stundenArbeit}
					placeholder="Dropdown"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
					on:change={updateArbeitswerte}
				>
					<option value="" disabled selected>Bitte wählen</option>
					{#each data.arbeitswerte as arbeit}
						<option value={arbeit.id}>{arbeit.Leistungsbezeichnung}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="kuerzel" class="block text-sm font-medium mb-1">Kürzel</label>
				<input
					id="kuerzel"
					type="text"
					bind:value={stundenKuerzel}
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
					readonly
				/>
			</div>
			<div>
				<label for="stundenMenge" class="block text-sm font-medium mb-1">Stunden</label>
				<input
					id="stundenMenge"
					type="number"
					bind:value={stundenMenge}
					placeholder="Stunden"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="stundenMenge" class="block text-sm font-medium mb-1">Infotext</label>
				<input
					id="geleisteteArbeit"
					type="text"
					bind:value={stundenInfotext}
					placeholder="geleistete Arbeit"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="rabatt" class="block text-sm font-medium mb-1">Rabatt</label>
				<input
					id="rabatt"
					type="number"
					bind:value={stundenRabatt}
					placeholder="Rabatt"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="festpreis" class="block text-sm font-medium mb-1">Festpreis</label>
				<input
					id="festpreis"
					type="number"
					bind:value={stundenFestpreis}
					placeholder=""
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
					readonly
				/>
			</div>
			<div>
				<label for="gesamtpreis" class="block text-sm font-medium mb-1">Nettosumme</label>
				<input
					id="stundenGesamtpreis"
					type="text"
					value={parseFloat(
						((stundenFestpreis * (100 - stundenRabatt)) / 100) * stundenMenge
					).toFixed(2)}
					placeholder="Gesamtpreis (wird berechnet)"
					class="w-full px-3 py-2 border rounded-lg bg-gray-100"
					disabled
				/>
			</div>
			<div>
				<label for="gesamtpreis" class="block text-sm font-medium mb-1">Bruttosumme</label>
				<input
					id="stundenGesamtpreis"
					type="text"
					value={parseFloat(
						((stundenFestpreis * (100 - stundenRabatt)) / 100) * stundenMenge * 1.2
					).toFixed(2)}
					placeholder="Gesamtpreis (wird berechnet)"
					class="w-full px-3 py-2 border rounded-lg bg-gray-100"
					disabled
				/>
			</div>
		</div>
		<div class="mt-4 flex justify-end gap-2">
			<button
				class="bg-gray-300 text-black hover:bg-gray-400 rounded-lg px-4 py-2"
				on:click={resetArbeitszeit}
			>
				Abbrechen
			</button>
			<button
				class="bg-slate-600 text-white hover:bg-salte-900 rounded-lg px-4 py-2"
				on:click={createArbeitszeit}
			>
				Hinzufügen
			</button>
		</div>
	</div>
{/if}

<!-- Option zur Auswahl von Barverkauf oder Überweisung -->
<div class="p-4">
	<h2 class="text-lg font-bold mb-4">Zahlungsart</h2>
	<div class="flex items-center gap-4">
		{#each zahlungsart as zahlungsart}
			<label class="flex items-center gap-2">
				<input
					type="radio"
					bind:group={ausgewählteZahlungsart}
					value={zahlungsart.Zahlungsart}
					on:change={updateAuftrag}
					class="form-radio text-slate-600 focus:ring focus:ring-blue-300"
				/>
				<span>{zahlungsart.Zahlungsart}</span>
			</label>
		{/each}
	</div>
	<!-- Anzeige der ausgewählten Zahlungsart -->
	<p class="mt-4 text-sm text-gray-600">
		Gewählte Zahlungsart: <span class="font-semibold">{ausgewählteZahlungsart}</span>
	</p>
</div>
<hr />
<!-- Bearbeitungsfeld -->
<div class="flex flex-col items-center">
	{#if showEditForm}
		<Card.Root class="lg:w-[700px]">
			<Card.Header>
				<Card.Title>Auftragsdaten bearbeiten</Card.Title>
			</Card.Header>
			<Card.Content>
				<form>
					<div class="flex flex-col space-y-1.5">
						<Label for="auftragnr">Auftragnummer</Label>
						<Input
							type="auftragnr"
							bind:value={updateAuftragnr}
							placeholder={data.auftrag.Auftragnummer}
							class="max-w-xs"
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="arbeiten">Arbeiten</Label>
						<Input
							type="arbeiten"
							bind:value={updateArbeiten}
							placeholder={data.auftrag.Arbeiten}
							class="max-w-xs"
						/>
						<!-- <div class="flex flex-col space-y-1.5">
							<Label for="bildSchaden">Bild vom Schaden</Label>
							<Input id="bildSchaden" bind:value={bildSchaden} type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="bildFertig">Bild vom reparierten Schaden</Label>
							<Input id="bildFertig" bind:value={bildFertig} type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="lieferschein">Lieferschein</Label>
							<Input id="lieferschien" bind:value={lieferschein} type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="rechnung">Rechnung</Label>
							<Input
								type="rechnung"
								bind:value={rechnung}
								placeholder="Rechnung erstellen"
								class="max-w-xs"
							/>
						</div> -->
						<div class="flex flex-col space-y-1.5">
							<Label for="arbeiten">Infotext</Label>
							<Input
								type="arbeiten"
								bind:value={updateInfotext}
								placeholder={data.auftrag.Infotext}
								class="max-w-xs"
							/>
						</div>
					</div>
				</form>
			</Card.Content>

			<Card.Footer class="flex justify-between">
				<button
					class="text-black bg-gray-300 hover:bg-gray-400 rounded-lg px-3 py-2 me-2 mb-2"
					on:click={resetupdateAuftrag}
				>
					Abbrechen
				</button>
				<button
					class="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-3 py-2 me-2 mb-2"
					on:click={updateAuftrag}
				>
					Speichern
				</button>
			</Card.Footer>
		</Card.Root>
	{/if}
</div>
