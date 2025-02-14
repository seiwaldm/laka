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
		'Geschlecht',
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
		Ort: 'Ort',
		Geschlecht: 'Geschlecht'
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
	let isSubmitted = false;

	// Überprüfung, ob ein Feld leer ist
	const validateField = (field) => field.trim() === '';

	const handleSubmit = async (event) => {
		event.preventDefault();
		isSubmitted = true;

		// Überprüfung: Felder "Kennzeichen", "Modell" und "Marke" dürfen nicht leer sein
		if (!validateField(modell) && !validateField(marke)) {
			await createFahrzeug(); // Fahrzeugdaten speichern
		}
	};

	// Funktion zur Formatierung des Datums
	function formatDate(dateString) {
		if (!dateString) return '-';
		else {
			const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		}
	}

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

	// Funktion zum Zurücksetzen der Fahrzeugdaten
	function resetFahrzeugdaten() {
		kennzeichen = '';
		fin = '';
		natCode = '';
		marke = '';
		modell = '';
		erstzulassung = '';
		kmstand = '';
		hubraum = '';
		kw = '';
		ps = '';
		pickerl = '';
		zulassungschein = '';
		kundenid = '';
		motorcode = '';
		kraftstoff = '';
		tachostand = '';
		tatKilometer = '';
		farbcode = '';
		showCard = false;
		isSubmitted = false;
	}

	let geschlecht = [
		{ id: 1, Geschlecht: 'männlich' },
		{ id: 2, Geschlecht: 'weiblich' }
	];
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
	let updateGeschlecht = '';

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
			updateOrt,
			updateGeschlecht
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

	// Funktion zum Zurücksetzen der Bearbeitungsfelder
	function resetupdateKunde() {
		updateKundennr = '';
		updateFirma = '';
		updateVorname = '';
		updateNachname = '';
		updateEmail = '';
		updateTelefonnr = '';
		updateStrasse = '';
		updatePlz = '';
		updateOrt = '';
		updateGeschlecht = '';
		showEditForm = false;
	}

	// Funktion zum Schließen des Bestätigungsdialogs
	function cancelDelete() {
		showDeleteConfirm = false;
	}

	// Funktion zum Löschen eines Kunden mit Bestätigung
	async function deleteKunde() {
		try {
			for (const fahrzeuge of data.fahrzeuge.items) {
				if (fahrzeuge.KundenID === $page.params.kunde) {
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
							for (const dateien of data.datei.items) {
								if (dateien.AuftragID === auftrag.id) {
									await pb.collection('Datei').delete(dateien.id);
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

<!-- Kundeninformationen -->
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
			<DropdownMenu.Trigger>
				<button class=" text-gray-600 hover:text-gray-800 text-2xl" aria-label="Options">
					⋮
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group class="mt-2 w-48 bg-white shadow-md rounded-md p-2" s>
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

					<a href="/">
						<button
							class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
							on:click={deleteKunde}
						>
							Löschen
						</button>
					</a>
				</div>
			</div>
		</div>
	{/if}

	<div class="my-5"><hr /></div>

	<!-- Fahrzeuganlegung Button -->
	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 mb-2"
		on:click={() => (showCard = true)}>Fahrzeuganlegung</button
	>
	<!-- Fahrzeuganlegung -->
	<div>
		{#if showCard}
			<!-- Overlay -->
			<button
				class="fixed inset-0 bg-gray-700 bg-opacity-50 z-40"
				on:click={() => (showCard = false)}
			></button>

			<div class="fixed inset-0 flex items-center justify-center z-50">
				<Card.Root
					class="lg:w-[700px] bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden flex flex-col"
				>
					<Card.Header class="p-4 border-b">
						<Card.Title class="text-lg font-bold">Neues Fahrzeug anlegen</Card.Title>
					</Card.Header>
					<Card.Content class="flex-1 overflow-y-auto p-4">
						<form on:submit={handleSubmit}>
							<div class="grid gap-4">
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
									<Label for="fin">FIN</Label>
									<Input type="fin" bind:value={fin} placeholder="J123456789P" class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="natcode">Nationaler Code</Label>
									<Input type="natcode" bind:value={natCode} placeholder="J189P" class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="marke">Marke</Label>
									<Input
										type="marke"
										bind:value={marke}
										placeholder="VW"
										class="max-w-xs {isSubmitted && validateField(marke)
											? 'border border-red-500'
											: ''}"
									/>
									{#if isSubmitted && validateField(marke)}
										<span class="text-sm text-red-500">Bitte geben Sie die Marke ein.</span>
									{/if}
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="modell">Modell</Label>
									<Input
										type="modell"
										bind:value={modell}
										placeholder="Golf 7"
										class="max-w-xs {isSubmitted && validateField(modell)
											? 'border border-red-500'
											: ''}"
									/>
									{#if isSubmitted && validateField(modell)}
										<span class="text-sm text-red-500">Bitte geben Sie das Modell ein.</span>
									{/if}
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="erstzulassung">Erstzulassung</Label>
									<Input type="date" bind:value={erstzulassung} class="max-w-xs" />
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="pickerl">Pickerl</Label>
									<Input type="date" bind:value={pickerl} class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="farbcode">Farbcode</Label>
									<Input
										type="farbcode"
										bind:value={farbcode}
										placeholder="ABC123"
										class="max-w-xs"
									/>
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="hubraum">Hubraum</Label>
									<Input type="hubraum" bind:value={hubraum} placeholder="80" class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="kw">KW</Label>
									<Input type="kw" bind:value={kw} placeholder="70" class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="kmstand">Kilometer Stand</Label>
									<Input
										type="kmstand"
										bind:value={kmstand}
										placeholder="100000"
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="kraftstoff">Kraftstoff</Label>
									<Input
										type="kraftstoff"
										bind:value={kraftstoff}
										placeholder="Diesel/Benzin"
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="motorcode">Motorcode</Label>
									<Input
										type="motorcode"
										bind:value={motorcode}
										placeholder="123456"
										class="max-w-xs"
									/>
								</div>
							</div>
						</form>
					</Card.Content>

					<Card.Footer class="p-4 border-t flex justify-between">
						<button
							type="reset"
							class="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
							on:click={resetFahrzeugdaten}
						>
							Abbrechen
						</button>
						<button
							type="submit"
							class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
							on:click={handleSubmit}
						>
							Speichern
						</button>
					</Card.Footer>
				</Card.Root>
			</div>
		{/if}
	</div>

	<!-- Kundenbearbeitungsfeld -->
	<div>
		{#if showEditForm}
			<button
				class="fixed inset-0 bg-gray-700 bg-opacity-50 z-40"
				on:click={() => (showEditForm = false)}
				tabindex="0"
			></button>
			<div class="fixed inset-0 flex items-center justify-center z-50">
				<Card.Root
					class="lg:w-[700px] bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden flex flex-col"
				>
					<Card.Header class="p-4 border-b">
						<Card.Title class="text-lg font-bold">Kundendaten bearbeiten</Card.Title>
					</Card.Header>
					<Card.Content class="flex-1 overflow-y-auto p-4">
						<form>
							<div class="grid gap-4">
								<div class="flex flex-col space-y-1.5">
									<Label for="kundennr">Kundennummer</Label>
									<Input
										type="kundennr"
										bind:value={updateKundennr}
										placeholder={data.Kundennr}
										class="max-w-xs"
									/>
								</div>

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
									<Label for="geschlecht">Geschlecht</Label>
									<select
										id="geschlecht"
										bind:value={updateGeschlecht}
										class="max-w-xs p-2 rounded-lg text-base"
									>
										<option class="max-w-xs text-base" value="" disabled selected>
											Bitte wähle das Geschlecht aus
										</option>
										{#each geschlecht as geschlecht}
											<option class="text-base" value={geschlecht.Geschlecht}
												>{geschlecht.Geschlecht}</option
											>
										{/each}
									</select>
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
						</form>
					</Card.Content>

					<Card.Footer class="p-4 border-t flex justify-between">
						<button
							class="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
							on:click={resetupdateKunde}
						>
							Abbrechen
						</button>
						<button
							class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
							on:click={updateKunde}
						>
							Speichern
						</button>
					</Card.Footer>
				</Card.Root>
			</div>
		{/if}
	</div>

	{#if data.fahrzeuge.items.length > 0}
		{#each data.fahrzeuge.items as fahrzeug (fahrzeug.id)}
			<a href="/{$page.params.kunde}/{fahrzeug.id}" class="flex items-center gap-2 leading-tight">
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{fahrzeug.Marke}
				{fahrzeug.Modell} <br />EZ: {formatDate(fahrzeug.Erstzulassung)}</a
			>
		{/each}
	{/if}
</div>
