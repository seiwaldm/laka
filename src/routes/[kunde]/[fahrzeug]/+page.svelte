<script>
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	//muss definiert werden:
	export let data;

	// Funktion zur Hubraum-Berechnung
	function berechnePS(kw) {
		return Math.ceil(kw * 1.36);
	}

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;

	// Zustand für die Sichtbarkeit des Bestätigungsdialogs definieren
	let showDeleteConfirm = false;

	// Variablen für die Auftragserstellung
	let arbeiten = '';
	let infotext = '';
	let bildSchaden = '';
	let bildFertig = '';
	let rechnung = '';
	let lieferschein = '';
	let fahrzeugid = $page.params.fahrzeug;

	let isSubmitted = false;

	// Überprüfung, ob das Feld leer ist
	const validateField = (field) => field.trim() === '';

	// Funktion zur Verarbeitung des Formulars
	const handleSubmit = async (event) => {
		event.preventDefault();
		isSubmitted = true;

		// Überprüfung: Das Feld "Arbeiten" darf nicht leer sein
		if (!validateField(arbeiten)) {
			await createAuftrag(); // Auftrag speichern
			alert('Auftrag erfolgreich gespeichert!');
		}
	};

	// Objekt für die Fahrzeugdatenbenennung
	const Fahrzeugdaten = {
		Erstzulassung: 'Erstzulassung',
		FIN: 'FIN',
		Kennzeichen: 'Kennzeichen',
		Marke: 'Marke',
		Modell: 'Modell',
		Nat_Code: 'Nationaler Code',
		Pickerl: 'Pickerl',
		Farbcode: 'Farbcode',
		Hubraum: 'Hubraum',
		KMStand: 'Kilometerstand',
		KW: 'KW',
		Kraftstoff: 'Kraftstoff',
		Motorcode: 'Motorcode'
	};

	// Funktion zum Erstellen eines Auftrags
	async function createAuftrag() {
		const auftragDaten = {
			action: 'createAuftrag',
			arbeiten,
			infotext,
			bildSchaden,
			bildFertig,
			rechnung,
			fahrzeugid,
			lieferschein
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

	// Funktion zum Zurücksetzen des Auftragsformulars
	function resetAuftrag() {
		arbeiten = '';
		infotext = '';
		bildSchaden = '';
		bildFertig = '';
		rechnung = '';
		lieferschein = '';
		showCard = false;
	}

	// Variablen für die update Funktion
	let updateFahrzeugid = $page.params.fahrzeug;
	let updateKennzeichen = '';
	let updateFin = '';
	let updateNatCode = '';
	let updateMarke = '';
	let updateModell = '';
	let updateErstzulassung = '';
	let updateKmstand = '';
	let updateHubraum = '';
	let updateKw = '';
	let updatePs = '';
	let updatePickerl = '';
	let updateZulassungschein = '';
	let updateKundenid = $page.params.kunde;
	let updateFarbcode = '';
	let updateMotorcode = '';
	let updateKraftstoff = '';

	// Funktion zum Aktualisieren des Fahrzeugs
	async function updateFahrzeug() {
		const fahrzeugDaten = {
			action: 'updateFahrzeug',
			updateFahrzeugid,
			updateKennzeichen,
			updateFin,
			updateNatCode,
			updateMarke,
			updateModell,
			updateErstzulassung,
			updateKmstand,
			updateHubraum,
			updateKw,
			updatePs,
			updatePickerl,
			updateZulassungschein,
			updateKundenid,
			updateFarbcode,
			updateMotorcode,
			updateKraftstoff
		};
		try {
			const response = await fetch('/update-client', {
				method: 'PUT',
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

	// Funktion zum Zurücksetzen des Bearbeitungsformulars
	function resetupdateFahrzeug() {
		updateKennzeichen = '';
		updateFin = '';
		updateNatCode = '';
		updateMarke = '';
		updateModell = '';
		updateErstzulassung = '';
		updateKmstand = '';
		updateHubraum = '';
		updateKw = '';
		updatePs = '';
		updatePickerl = '';
		updateZulassungschein = '';
		updateKundenid = '';
		updateFarbcode = '';
		updateMotorcode = '';
		updateKraftstoff = '';
		showEditForm = false;
	}

	// Funktion zum Schließen des Bestätigungsdialogs
	function cancelDelete() {
		showDeleteConfirm = false;
	}

	// Funktion zum Löschen eines Kunden mit Bestätigung
	async function deleteFahrzeug() {
		// const confirmed = confirm(
		// 	'Möchten Sie dieses Fahrzeug und alle zugehörigen und Aufträge wirklich löschen?'
		// );
		// if (!confirmed) return;
		try {
			for (const auftrag of data.auftrag.items) {
				if (auftrag.FahrzeugID === $page.params.fahrzeug) {
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
			await pb.collection('Fahrzeug').delete($page.params.fahrzeug);
			console.log($page.params.fahrzeug);
			location.reload();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<!-- Link zu den Seiten -->
<h1 class="text-base pl-5 flex items-center my-5">
	<!-- Mobile und Tablet Design -->
	<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block lg:hidden"></iconify-icon>
	<a href="/{$page.params.kunde}" class="hover:underline block lg:hidden"> Zurück </a>

	<!-- Desktop Design (ab 1024px / lg-Breakpoint) -->
	<div class="hidden lg:flex items-center">
		<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/" class="hover:underline">Startseite </a>
		<iconify-icon icon="lucide:chevron-right" class="mt-0.5 mx-1"></iconify-icon>
		<a href="/{$page.params.kunde}" class="hover:underline">Kunde {data.Nachname}</a>
		<iconify-icon icon="lucide:chevron-right" class="mt-0.5 mx-1"></iconify-icon>

		Fahrzeug {data.fahrzeuge.Marke}
	</div>
</h1>
<hr />

<div class="pl-5">
	<h1 class="my-5 pl-2 text-2xl font-bold">Fahrzeuginformationen</h1>
	<!-- Unterüberschrift 1 -->
	<h2 class="text-lg font-bold mb-4">Basisdaten</h2>
	{#each Object.entries(data.fahrzeuge).filter((item) => item[0] === 'Kennzeichen' || item[0] === 'FIN' || item[0] === 'Nat_Code' || item[0] === 'Marke' || item[0] === 'Modell' || item[0] === 'Erstzulassung' || item[0] === 'Pickerl') as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<iconify-icon icon={icons[key]} class="mr-2 text-2xl translate-y-1"></iconify-icon>
			<span class="font-bold">{Fahrzeugdaten[key]}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}

	<!-- Unterüberschrift 2 -->
	<h2 class="text-lg font-bold mt-6 mb-4">Technik</h2>
	{#each Object.entries(data.fahrzeuge).filter((item) => item[0] === 'KMStand' || item[0] === 'Hubraum' || item[0] === 'KW' || item[0] === 'Farbcode' || item[0] === 'Motorcode' || item[0] === 'Kraftstoff') as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<iconify-icon icon={icons[key]} class="mr-2 text-2xl translate-y-1"></iconify-icon>
			<span class="font-bold">{key}:</span>
			<span class="absolute left-48">
				{#if key === 'KW'}
					{value} ({data.fahrzeuge.PS} PS)
				{:else}
					{value}
				{/if}
			</span>
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
					<DropdownMenu.Label class="text-black text-base hover:bg-salte-600 rounded-lg px-4 py-2">
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
				<p>Möchten Sie dieses Fahrzeug wirklich löschen?</p>
				<div class="mt-4 flex justify-end gap-4">
					<button
						class="text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
						on:click={cancelDelete}
					>
						Abbrechen
					</button>
					<a href="/{$page.params.kunde}">
						<button
							class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
							on:click={deleteFahrzeug}
						>
							Löschen
						</button></a
					>
				</div>
			</div>
		</div>
	{/if}

	<div class="my-5"><hr /></div>

	<!-- Auftraganlegung -->
	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 me-2 mb-"
		on:click={() => (showCard = true)}>Auftraganlegung</button
	>
	<div>
		{#if showCard}
			<!-- Overlay -->
			<button
				class="fixed inset-0 bg-gray-700 bg-opacity-50 z-40"
				on:click={() => (showCard = false)}
				on:keydown={(e) => e.key === 'Enter' && (showCard = false)}
				tabindex="0"
			></button>
			<div class="fixed inset-0 flex items-center justify-center z-50">
				<Card.Root
					class="lg:w-[700px] bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden flex flex-col"
				>
					<Card.Header class="p-4 border-b">
						<Card.Title class="text-lg font-bold">Neuen Auftrag anlegen</Card.Title>
					</Card.Header>
					<Card.Content class="flex-1 overflow-y-auto p-4">
						<form>
							<div class="grid gap-4">
								<div class="flex flex-col space-y-1.5">
									<Label for="arbeiten">Arbeiten</Label>
									<Input
										type="arbeiten"
										bind:value={arbeiten}
										placeholder="Arbeiten an..."
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="bildSchaden">Bild vom Schaden</Label>
									<Input id="bildSchaden" bind:value={bildSchaden} type="file" class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="bildFertig">Bild vom reparierten Schaden</Label>
									<Input id="bildFertig" bind:value={bildFertig} type="file" class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="arbeiten">Infotext</Label>
									<Input
										type="arbeiten"
										bind:value={infotext}
										placeholder="Arbeitsbeschreibung"
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="lieferschein">Lieferschein</Label>
									<Input id="lieferschien" bind:value={lieferschein} type="file" class="max-w-xs" />
								</div>
								<div class="flex flex-col space-y-1.5">
									<Label for="rechnung">Rechnung</Label>
									<Input
										bind:value={rechnung}
										placeholder="Rechnung erstellen"
										type="file"
										class="max-w-xs"
									/>
								</div>
							</div>
						</form>
					</Card.Content>

					<Card.Footer class="p-4 border-t flex justify-between">
						<button
							class="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
							on:click={resetAuftrag}
						>
							Abbrechen
						</button>
						<button
							class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
							on:click={createAuftrag}
						>
							Speichern
						</button>
					</Card.Footer>
				</Card.Root>
			</div>
		{/if}
	</div>

	<!-- Fahrzeugbearbeitungsfeld -->
	<div>
		{#if showEditForm}
			<!-- Overlay -->
			<button
				class="fixed inset-0 bg-gray-700 bg-opacity-50 z-40"
				on:click={() => (showEditForm = false)}
				on:keydown={(e) => e.key === 'Enter' && (showEditForm = false)}
				tabindex="0"
			></button>

			<div class="fixed inset-0 flex items-center justify-center z-50">
				<Card.Root
					class="lg:w-[700px] bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden flex flex-col"
				>
					<Card.Header class="p-4 border-b">
						<Card.Title class="text-lg font-bold">Fahrzeugdaten bearbeiten</Card.Title>
					</Card.Header>
					<Card.Content class="flex-1 overflow-y-auto p-4">
						<form>
							<div class="grid gap-4">
								<div class="flex flex-col space-y-1.5">
									<Label for="erstzulassung">Erstzulassung</Label>
									<Input
										type="erstzulassung"
										bind:value={updateErstzulassung}
										placeholder={data.fahrzeuge.Erstzulassung}
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="fin">FIN</Label>
									<Input
										type="FIN"
										bind:value={updateFin}
										placeholder={data.fahrzeuge.FIN}
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="kennzeichen">Kennzeichen</Label>
									<Input
										type="kennzeichen"
										bind:value={updateKennzeichen}
										placeholder={data.fahrzeuge.Kennzeichen}
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="marke">Marke</Label>
									<Input
										type="marke"
										bind:value={updateMarke}
										placeholder={data.fahrzeuge.Marke}
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="modell">Modell</Label>
									<Input
										type="mddell"
										bind:value={updateModell}
										placeholder={data.fahrzeuge.Modell}
										class="max-w-xs"
									/>
								</div>

								<div class="flex flex-col space-y-1.5">
									<Label for="natcode">Nationaler Code</Label>
									<Input
										type="NatCode"
										bind:value={updateNatCode}
										placeholder={data.fahrzeuge.Nat_Code}
										class="max-w-xs"
									/>
									<div class="flex flex-col space-y-1.5">
										<Label for="picerkl">Pickerl</Label>
										<Input
											type="pickerl"
											bind:value={updatePickerl}
											placeholder={data.fahrzeuge.Pickerl}
											class="max-w-xs"
										/>
									</div>

									<div class="flex flex-col space-y-1.5">
										<Label for="farbcode">Farbcode</Label>
										<Input
											type="farbcode"
											bind:value={updateFarbcode}
											placeholder={data.fahrzeuge.Farbcode}
											class="max-w-xs"
										/>
									</div>
									<div class="flex flex-col space-y-1.5">
										<Label for="hubraum">Hubraum</Label>
										<Input
											type="hubraum"
											bind:value={updateHubraum}
											placeholder={data.fahrzeuge.Hubraum}
											class="max-w-xs"
										/>
									</div>
									<div class="flex flex-col space-y-1.5">
										<Label for="kmstand">Kilometerstand</Label>
										<Input
											type="kmstand"
											bind:value={updateKmstand}
											placeholder={data.fahrzeuge.KMStand}
											class="max-w-xs"
										/>
									</div>
									<div class="flex flex-col space-y-1.5">
										<Label for="kw">KW</Label>
										<Input
											type="kw"
											bind:value={updateKw}
											placeholder={data.fahrzeuge.KW}
											class="max-w-xs"
										/>
									</div>
									<div class="flex flex-col space-y-1.5">
										<Label for="kraftstoff">Kraftstoff</Label>
										<Input
											type="kraftstoff"
											bind:value={updateKraftstoff}
											placeholder={data.fahrzeuge.Kraftstoff}
											class="max-w-xs"
										/>
									</div>
									<div class="flex flex-col space-y-1.5">
										<Label for="motorcode">Motorcode</Label>
										<Input
											type="motorcode"
											bind:value={updateMotorcode}
											placeholder={data.fahrzeuge.Motorcode}
											class="max-w-xs"
										/>
									</div>
								</div>
							</div>
						</form>
					</Card.Content>

					<!-- Footer -->
					<Card.Footer class="p-4 border-t flex justify-between">
						<button
							class="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
							on:click={resetupdateFahrzeug}
						>
							Abbrechen
						</button>
						<button
							class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
							on:click={updateFahrzeug}
						>
							Speichern
						</button>
					</Card.Footer>
				</Card.Root>
			</div>
		{/if}
	</div>

	{#if data.auftrag.items.length > 0}
		{#each data.auftrag.items as Auftrag (Auftrag.id)}
			<a
				href="/{$page.params.kunde}/{$page.params.fahrzeug}/{Auftrag.id}"
				class="flex items-center gap-2 leading-tight"
			>
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{Auftrag.Arbeiten}
			</a>
		{/each}
	{/if}
</div>
