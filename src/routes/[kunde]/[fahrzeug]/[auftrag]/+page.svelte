<script>
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';
	import { openCloudinaryWidgetSchaden } from '$lib/cloudinary.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import 'iconify-icon';

	// laden der Daten
	export let data;

	// Funktion zum öffnen des Cloudinary Widgets, so dass sie in icons verwendet werden kann

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;

	// Zustand für die Sichtbarkeit der Rechnung definieren
	let showRechnung = false;

	// Zustand für die Sichtbarkeit des Bestätigungsdialogs definieren
	let showDeleteConfirm = false;

	// Variablen für die update Funktion
	let updateAuftragid = $page.params.auftrag;
	let updateArbeiten = '';
	let updateBildSchaden = '';
	let updateBildFertig = '';
	let updateRechnung = '';
	let updateFahrzeugid = $page.params.fahrzeug;
	let updateAuftragnr = '';
	let updateInfotext = '';

	// Variablen für die Rechnungerstellung
	let bezeichnung = '';
	let menge = '';
	let einzelpreis = '';
	let rabatt = '';

	// Funktion zum erstellen einer Rechnung (Datensatz)
	async function createRechnung() {
		const auftragDaten = {
			action: 'createAuftrag',
			bezeichnung,
			menge,
			einzelpreis,
			rabatt
		};
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(auftragDaten)
			});
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(auftragDaten);
	}

	// funktion zum aktualisieren des Auftrags
	async function updateAuftrag() {
		const auftragDaten = {
			action: 'updateAuftrag',
			updateAuftragid,
			updateArbeiten,
			updateBildSchaden,
			updateBildFertig,
			updateRechnung,
			updateAuftragnr,
			updateFahrzeugid
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

	// Funktion zum Schließen des Bestätigungsdialogs
	function cancelDelete() {
		showDeleteConfirm = false;
	}

	// Funktion zum Löschen eines Kunden mit Bestätigung
	async function deleteAuftrag() {
		try {
			await pb.collection('Kunde').delete($page.params.kunde);
			location.reload();
		} catch (error) {
			console.error(error);
		}
	}
	// Zustand für die Sichtbarkeit des Formulars "Ersatzteile hinzufügen"
	let showAddPartForm = false;
	// Zustand für die Sichtbarkeit des Formulars "Arbeitsstunden hinzufügen"
	let showAddHourForm = false;

	// Variablen für die Felder des Formulars Ersatzteile
	let ersatzteilName = '';
	let ersatzteilEinzelpreis = '';
	let ersatzteilStück = '';
	let ersatzteilGesamtpreis = '';

	// Variablen für die Felder des Formulars Arbeitsstunden
	let arbeitName = '';
	let stundenMenge = '';
	let stundenEinzelpreis = '';
	let stundenGesamtpreis = '';

	// Funktion zum Hinzufügen eines Arbeitsstunden
	function addArbeitsstunden() {
		// Berechnung des Gesamtpreises
		stundenGesamtpreis = stundenEinzelpreis * stundenMenge;

		// Hier kannst du die Daten weiterverarbeiten oder speichern
		console.log({
			Name: arbeitName,
			Einzelpreis: stundenEinzelpreis,
			Menge: stundenMenge,
			Gesamtpreis: stundenGesamtpreis
		});
		// Formular zurücksetzen und ausblenden
		let arbeitName = '';
		let stundenMenge = '';
		let stundenEinzelpreis = '';
		let stundenGesamtpreis = '';
		showAddHourForm = false;
	}

	// Funktion zum Hinzufügen der Ersatzteils
	function addErsatzteil() {
		// Berechnung des Gesamtpreises
		ersatzteilGesamtpreis = ersatzteilEinzelpreis * ersatzteilStück;

		// Hier kannst du die Daten weiterverarbeiten oder speichern
		console.log({
			Name: ersatzteilName,
			Einzelpreis: ersatzteilEinzelpreis,
			Stück: ersatzteilStück,
			Gesamtpreis: ersatzteilGesamtpreis
		});

		// Formular zurücksetzen und ausblenden
		ersatzteilName = '';
		ersatzteilEinzelpreis = '';
		ersatzteilStück = '';
		ersatzteilGesamtpreis = '';
		showAddPartForm = false;
	}
</script>

<!-- Dateien auf cloudinary hochladen -->
<svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/latest/global/all.js"
		type="text/javascript"
	></script>
</svelte:head>

<h1 class="text-lg pl-5 flex items-center my-5">
	<!-- Mobile und Tablet Design -->
	<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block lg:hidden"></iconify-icon>
	<a href="/{$page.params.kunde}/{$page.params.fahrzeug}" class="hover:underline block lg:hidden">
		Zurück
	</a>

	<!-- Desktop Design ) -->
	<div class="hidden lg:flex items-center">
		<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/" class="hover:underline">Startseite </a>
		<iconify-icon icon="lucide:chevron-right" class="mt-0.5 mx-1"></iconify-icon>
		<a href="/{$page.params.kunde}" class="hover:underline">Kunde {data.Nachname}</a>
		<iconify-icon icon="lucide:chevron-right" class="mt-0.5 mx-1"></iconify-icon>
		<a href="/{$page.params.kunde}/{$page.params.fahrzeug}" class="hover:underline">
			Fahrzeug {data.fahrzeuge.Marke}
		</a>
		<iconify-icon icon="lucide:chevron-right" class="mt-0.5 mx-1"></iconify-icon>
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
			<DropdownMenu.Group class="mt-2 w-48 bg-white shadow-md rounded-md p-2" s>
				<!-- Neu: Bestätigungsdialog -->
				<DropdownMenu.Label class="text-black hover:bg-blue-600 rounded-lg px-4 py-2">
					<button on:click={() => (showDeleteConfirm = true)}>Löschen</button>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Label class="text-black hover:bg-blue-600 rounded-lg px-4 py-2">
					<button
						on:click={() => {
							showEditForm = true;
							showDeleteConfirm = false; // Dropdown schließt sich
						}}
					>
						Bearbeiten
					</button>
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
				<button
					class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
					on:click={deleteAuftrag}
				>
					Löschen
				</button>
			</div>
		</div>
	</div>
{/if}
<div class="my-5"><hr /></div>

<button
	class="
	bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2
	absolute top-10 right-5
	sm:static sm:mt-4 sm:ml-auto
	md:absolute md:top-10 md:right-5
"
	on:cklick={() => (showRechnung = true)}
>
	Rechnung
</button>

<!-- Button zum öffnen des Cloudinary Widgets
<button on:click={openCloudinaryWidgetSchaden}
	><iconify-icon icon="lucide:camera"></iconify-icon></button
> -->

<!-- Auftraginformationen  -->
<div class="pl-5">
	<h1 class=" my-5 text-2xl font-bold">Auftraginformationen</h1>
	{#each Object.entries(data.auftrag).filter((item) => item[0] === 'Auftragnummer' || item[0] === 'Infotext' || item[0] === 'Arbeiten' || item[0] === 'BildSchaden' || item[0] === 'BildFertig' || item[0] === 'Infotext') as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<button class="mr-2" on:click={() => icons[key]?.action && icons[key].action()}>
				<iconify-icon
					icon={typeof icons[key] === 'object' ? icons[key].icon : icons[key]}
					class="mr-2 text-2xl translate-y-1"
				></iconify-icon></button
			>
			<span class="font-bold">{key}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}

	<!-- Unterüberschrift 1 -->
	<h2 class="text-lg font-bold mb-4">Ersatzteile</h2>
	<button
		class="ml-4 bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-3 py-1"
		on:click={() => (showAddPartForm = !showAddPartForm)}
	>
		+
	</button>

	<!-- Unterüberschrift 2 -->
	<h2 class="text-lg font-bold mt-6 mb-4">Arbeitsstunden</h2>
	<button
		class="ml-4 bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-3 py-1"
		on:click={() => (showAddHourForm = !showAddHourForm)}
	>
		+
	</button>
</div>

<!-- Formular zum Hinzufügen eines Ersatzteils -->
{#if showAddPartForm}
	<div class="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
		<h3 class="text-lg font-semibold mb-2">Ersatzteil hinzufügen</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="ersatzteilName" class="block text-sm font-medium mb-1">Name</label>
				<input
					id="ersatzteilName"
					type="text"
					bind:value={ersatzteilName}
					placeholder="Ersatzteil Name"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="einzelpreis" class="block text-sm font-medium mb-1">Einzelpreis</label>
				<input
					id="einzelpreis"
					type="text"
					bind:value={ersatzteilEinzelpreis}
					placeholder="Einzelpreis"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="ersatzteilStück" class="block text-sm font-medium mb-1">Stück</label>
				<input
					id="ersatzteilStück"
					type="number"
					bind:value={ersatzteilStück}
					placeholder="Stück"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="gesamtpreis" class="block text-sm font-medium mb-1">Gesamtpreis</label>
				<input
					id="gesamtpreis"
					type="text"
					value={ersatzteilEinzelpreis * ersatzteilStück}
					placeholder="Gesamtpreis (wird berechnet)"
					class="w-full px-3 py-2 border rounded-lg bg-gray-100"
					disabled
				/>
			</div>
		</div>
		<div class="mt-4 flex justify-end gap-2">
			<button
				class="bg-gray-300 text-black hover:bg-gray-400 rounded-lg px-4 py-2"
				on:click={() => (showAddPartForm = false)}
			>
				Abbrechen
			</button>
			<button
				class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2"
				on:click={addErsatzteil}
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
			<div>
				<label for="arbeitName" class="block text-sm font-medium mb-1">Name</label>
				<input
					id="arbeitName"
					type="text"
					bind:value={arbeitName}
					placeholder="Arbeit Name"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div>
				<label for="stundenEinzelpreis" class="block text-sm font-medium mb-1"
					>Einzelstundenpreis</label
				>
				<input
					id="einzelpreis"
					type="text"
					bind:value={stundenEinzelpreis}
					placeholder="Einzelpreis"
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
				<label for="gesamtpreis" class="block text-sm font-medium mb-1">Gesamtpreis</label>
				<input
					id="stundenGesamtpreis"
					type="text"
					value={stundenMenge * stundenEinzelpreis}
					placeholder="Gesamtpreis (wird berechnet)"
					class="w-full px-3 py-2 border rounded-lg bg-gray-100"
					disabled
				/>
			</div>
		</div>
		<div class="mt-4 flex justify-end gap-2">
			<button
				class="bg-gray-300 text-black hover:bg-gray-400 rounded-lg px-4 py-2"
				on:click={() => (showAddHourForm = false)}
			>
				Abbrechen
			</button>
			<button
				class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2"
				on:click={addArbeitsstunden}
			>
				Hinzufügen
			</button>
		</div>
	</div>
{/if}
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
					<div class="grid w-full items-center gap-4">
						<div class="flex flex-col space-y-1.5">
							<Label for="arbeiten">Arbeiten</Label>
							<Input
								type="arbeiten"
								bind:value={updateArbeiten}
								placeholder={data.auftrag.Arbeiten}
								class="max-w-xs"
							/>
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
					</div>
				</form>
			</Card.Content>

			<Card.Footer class="flex justify-between">
				<button
					class="text-black bg-gray-300 hover:bg-gray-400 rounded-lg px-3 py-2 me-2 mb-2"
					on:click={() => (showEditForm = false)}
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

<div class="flex flex-col items-center">
	{#if showRechnung}
		<Card.Root class="top-12">
			<Card.Header>
				<Card.Title>Auftrager</Card.Title>
			</Card.Header>
			<Card.Content>
				<form>
					<div class="flex flex-col space-y-1.5">
						<Label for="auftragnr">Bezeichnung</Label>
						<Input type="auftragnr" bind:value={bezeichnung} class="max-w-xs" />
					</div>
					<div class="grid w-full items-center gap-4">
						<div class="flex flex-col space-y-1.5">
							<Label for="arbeiten">Menge</Label>
							<Input type="arbeiten" bind:value={menge} class="max-w-xs" />
						</div>
					</div>
				</form>
			</Card.Content>

			<Card.Footer class="flex justify-between">
				<button
					class="text-black bg-gray-300 hover:bg-gray-400 rounded-lg px-3 py-2 me-2 mb-2"
					on:click={() => (showEditForm = false)}
				>
					Abbrechen
				</button>
				<!-- <a
					href="/{$page.params.kunde}/{$page.params.fahrzeug}/{$page.params.auftrag}/{data.rechnung
						.id}>" -->
				<button
					class="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-3 py-2 me-2 mb-2"
					on:click={createRechnung}
				>
					Speichern
				</button>
				<!-- </a> -->
			</Card.Footer>
		</Card.Root>
	{/if}
</div>
