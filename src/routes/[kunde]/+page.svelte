<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import { pb } from '$lib/pocketbase.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	//muss definiert werden:
	export let data;
	// Array mit den Feldern, die angezeigt werden sollen
	let datenfelder = [
		'Kundennr',
		'Firma',
		'Vorname',
		'Nachname',
		'EMail',
		'Telefonnr',
		'Strasse',
		'PLZ',
		'Ort'
	];

	// Objekt mit den Feldern und den dazugehörigen Bezeichnungen, für die Anzeige
	const kundendaten = {
		Kundennr: 'Kundennummer',
		Firma: 'Firma',
		Vorname: 'Vorname',
		Nachname: 'Nachname',
		EMail: 'E-Mail',
		Telefonnr: 'Telefonnummer',
		Strasse: 'Strasse',
		PLZ: 'PLZ',
		Ort: 'Ort'
	};

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;
	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;
	// Zustand für die Sichtbarkeit des Bestätigungsdialogs definieren
	let showDeleteConfirm = false;

	// Variablen für die Fahrzeuganlegung
	let kennzeichen = '';
	let fin = '';
	let natCode = '';
	let marke = '';
	let modell = '';
	let erstzulassung = '';
	let kmstand = '';
	let hubraum = '';
	let kw = '';
	let ps = '';
	let pickerl = '';
	let zulassungschein = '';
	let kundenid = $page.params.kunde;
	let motorcode = '';
	let kraftstoff = '';
	let tachostand = '';
	let tatKilometer = '';
	let farbcode = '';

	// Funktion zum Erstellen eines Fahrzeugs
	async function createFahrzeug() {
		const fahrzeugDaten = {
			action: 'createFahrzeug',
			kennzeichen,
			fin,
			natCode,
			marke,
			modell,
			erstzulassung,
			kmstand,
			hubraum,
			kw,
			ps,
			pickerl,
			zulassungschein,
			kundenid,
			motorcode,
			kraftstoff,
			tachostand,
			tatKilometer,
			farbcode
		};
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(fahrzeugDaten)
			});
			const result = await response.json();
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(fahrzeugDaten);
	}

	// Variablen für die Bearbeitung eines Kunden
	let updateKundenid = $page.params.kunde;
	let updateKundennr = '';
	let updateFirma = '';
	let updateVorname = '';
	let updateNachname = '';
	let updateEmail = '';
	let updateTelefonnr = '';
	let updateStrasse = '';
	let updatePlz = '';
	let updateOrt = '';

	// Funktion zum Aktualisieren eines Kunden
	async function updateKunde() {
		const kundeDaten = {
			action: 'updateKunde',
			updateKundenid,
			updateKundennr,
			updateFirma,
			updateVorname,
			updateNachname,
			updateEmail,
			updateTelefonnr,
			updateStrasse,
			updatePlz,
			updateOrt
		};
		try {
			const response = await fetch('/update-client', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(kundeDaten)
			});
			const result = await response.json();
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(kundeDaten);
	}

	// Funktion zum Schließen des Bestätigungsdialogs
	function cancelDelete() {
		showDeleteConfirm = false;
	}

	// Funktion zum Löschen eines Kunden mit Bestätigung
	async function deleteKunde() {
		try {
			await pb.collection('Kunde').delete($page.params.kunde);
			location.reload();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<!-- Link zu den verschiedenen Seiten -->
<h1 class="text-base pl-5 flex items-center my-5">
	<!-- Mobile und Tablet Design -->
	<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block lg:hidden"></iconify-icon>
	<a href="/" class="hover:underline block lg:hidden"> Zurück </a>

	<!-- Desktop Design (ab 1024px / lg-Breakpoint) -->
	<div class="hidden lg:flex items-center">
		<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/" class="hover:underline">Startseite </a>
		<iconify-icon icon="lucide:chevron-right" class="mt-0.5 mx-1"></iconify-icon>
		Kunde {data.Nachname}
	</div>
</h1>
<hr />

<div class="pl-5">
	<h1 class=" my-5 pl-2 text-2xl font-bold">Kundeninformationen</h1>
	{#each Object.entries(data)
		.filter((item) => datenfelder.includes(item[0]))
		.sort((a, b) => datenfelder.indexOf(a[0]) - datenfelder.indexOf(b[0])) as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<iconify-icon icon={icons[key]} class="mr-2 text-2xl translate-y-1"></iconify-icon>
			<span class="font-bold">{kundendaten[key]}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}

	<!-- Icon mit 3 Punkten für das Dropdown-Menü -->
	<div class="absolute top-32 lg:top-10 right-10">
		<DropdownMenu.Root>
			<!-- Füge relative Positionierung hinzu -->
			<DropdownMenu.Trigger>
				<button class=" text-gray-600 hover:text-gray-800 text-2xl" aria-label="Options">
					⋮
				</button>
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
				<p>Möchten Sie diesen Kunden wirklich löschen?</p>
				<div class="mt-4 flex justify-end gap-4">
					<button
						class="text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
						on:click={cancelDelete}
					>
						Abbrechen
					</button>
					<button
						class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
						on:click={deleteKunde}
					>
						Löschen
					</button>
				</div>
			</div>
		</div>
	{/if}

	<div class="my-5"><hr /></div>
	<!-- Fahrzeuganlegung Button -->
	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 me-2 mb-"
		on:click={() => (showCard = true)}>Fahrzeuganlegung</button
	>
	<!-- Fahrzeuganlegung -->
	<div class="flex flex-col items-center mb-5">
		{#if showCard}
			<Card.Root class="lg:w-[700px]">
				<Card.Header>
					<Card.Title>Neues Fahrzeug anlegen</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="erstzulassung">Erstzulassung</Label>
								<Input type="date" bind:value={erstzulassung} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="kennzeichen">Kennzeichen</Label>
								<Input
									type="kennzeichen"
									bind:value={kennzeichen}
									placeholder="JO-123AB"
									class="max-w-xs"
								/>
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="fin">Fahrzeugidendifizierungsnummer</Label>
								<Input type="fin" bind:value={fin} placeholder="J123456789P" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="marke">Marke</Label>
								<Input type="marke" bind:value={marke} placeholder="VW" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="modell">Modell</Label>
								<Input type="modell" bind:value={modell} placeholder="Golf 7" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="natcode">Nationaler Code</Label>
								<Input type="natcode" bind:value={natCode} placeholder="J189P" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="pickerl">Pickerl</Label>
								<Input type="date" bind:value={pickerl} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="farbcode">Farbcode</Label>
								<Input type="farbcode" bind:value={farbcode} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="hubraum">Hubraum</Label>
								<Input type="hubraum" bind:value={hubraum} placeholder="80" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="kmstand">Kilometer Stand</Label>
								<Input type="kmstand" bind:value={kmstand} placeholder="100000" class="max-w-xs" />
							</div>

							<div class="flex flex-col space-y-1.5">
								<Label for="kw">KW</Label>
								<Input type="kw" bind:value={kw} placeholder="70" class="max-w-xs" />
							</div>

							<div class="flex flex-col space-y-1.5">
								<Label for="kraftstoff">Kraftstoff</Label>
								<Input type="kraftstoff" bind:value={kraftstoff} class="max-w-xs" />
							</div>

							<div class="flex flex-col space-y-1.5">
								<Label for="motorcode">Motorcode</Label>
								<Input type="motorcode" bind:value={motorcode} class="max-w-xs" />
							</div>
						</div>
					</form>
				</Card.Content>

				<Card.Footer class="flex justify-between">
					<button
						class="text-black bg-gray-300 hover:bg-gray-400 rounded-lg px-3 py-2 me-2 mb-2"
						on:click={() => (showCard = false)}
					>
						Abbrechen
					</button>
					<button
						class="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-3 py-2 me-2 mb-2"
						on:click={createFahrzeug}
					>
						Speichern
					</button>
				</Card.Footer>
			</Card.Root>
		{/if}
	</div>

	<!-- Bearbeitungsfeld -->
	<div class="flex flex-col items-center mb-5">
		{#if showEditForm}
			<Card.Root class="lg:w-[700px]">
				<Card.Header>
					<Card.Title>Kundendaten bearbeiten</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="kundennr">Kundennummer</Label>
								<Input
									type="kundennr"
									bind:value={updateKundennr}
									placeholder={data.Kundennr}
									class="max-w-xs"
								/>
							</div>
							<div class="grid w-full items-center gap-4">
								<div class="flex flex-col space-y-1.5">
									<Label for="vorname">Vorname</Label>
									<Input
										type="vorname"
										bind:value={updateVorname}
										placeholder={data.Vorname}
										class="max-w-xs"
									/>
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="nachname">Nachname</Label>
									<Input
										id="nachname"
										bind:value={updateNachname}
										placeholder={data.Nachname}
										class="max-w-xs"
									/>
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="email">E-Mail</Label>
									<Input
										id="email"
										bind:value={updateEmail}
										placeholder={data.EMail}
										class="max-w-xs"
									/>
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="telefonnr">Telefonnummer</Label>
									<Input
										type="telefonnr"
										bind:value={updateTelefonnr}
										placeholder={data.Telefonnr}
										class="max-w-xs"
									/>
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="strasse">Straße</Label>
									<Input
										type="strasse"
										bind:value={updateStrasse}
										placeholder={data.Strasse}
										class="max-w-xs"
									/>
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="plz">PLZ</Label>
									<Input
										type="plz"
										bind:value={updatePlz}
										placeholder={data.PLZ}
										class="max-w-xs"
									/>
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="ort">Ort</Label>
									<Input
										type="ort"
										bind:value={updateOrt}
										placeholder={data.Ort}
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
						on:click={updateKunde}
					>
						Speichern
					</button>
				</Card.Footer>
			</Card.Root>
		{/if}
	</div>

	{#if data.fahrzeuge.items.length > 0}
		{#each data.fahrzeuge.items as fahrzeug (fahrzeug.id)}
			<a href="/{$page.params.kunde}/{fahrzeug.id}" class="flex items-center gap-2 leading-tight">
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{fahrzeug.Marke}
				{fahrzeug.Modell} <br />EZ: {fahrzeug.Erstzulassung}</a
			>
		{/each}
	{/if}
</div>
