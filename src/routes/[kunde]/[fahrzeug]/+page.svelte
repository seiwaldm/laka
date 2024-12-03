<script>
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

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

	let arbeiten = '';
	let bildSchaden = '';
	let bildFertig = '';
	let rechnung = '';
	let fahrzeugid = $page.params.fahrzeug;
	let auftragnr = '';

	async function createAuftrag() {
		const auftragDaten = {
			action: 'createAuftrag',
			arbeiten,
			bildSchaden,
			bildFertig,
			rechnung,
			auftragnr,
			fahrzeugid
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
	async function deleteFahrzeug() {
		await pb.collection('Fahrzeug').delete($page.params.fahrzeug);
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
	<h1 class="my-5 text-2xl font-bold">Fahrzeuginformationen</h1>
	<!-- Unterüberschrift 1 -->
	<h2 class="text-lg font-bold mb-4">Basisdaten</h2>
	{#each Object.entries(data.fahrzeuge).filter((item) => item[0] === 'Kennzeichen' || item[0] === 'FIN' || item[0] === 'Nat_Code' || item[0] === 'Marke' || item[0] === 'Modell' || item[0] === 'Erstzulassung' || item[0] === 'Pickerl') as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<iconify-icon icon={icons[key]} class="mr-2 text-2xl translate-y-1"></iconify-icon>
			<span class="font-bold">{key}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}

	<!-- Unterüberschrift 2 -->
	<h2 class="text-lg font-bold mt-6 mb-4">Technik</h2>
	{#each Object.entries(data.fahrzeuge).filter((item) => item[0] === 'KMStand' || item[0] === 'Hubraum' || item[0] === 'KW' || item[0] === 'Farbcode' || item[0] === 'Motorcode' || item[0] === 'Kraftstoff' || item[0] === 'PS') as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<iconify-icon icon={icons[key]} class="mr-2 text-2xl translate-y-1"></iconify-icon>
			<span class="font-bold">{key}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}

	<div class="relative">
		<!-- Bearbeiten Button -->
		<button
			class="
				bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2
				absolute top-10 right-5
				sm:static sm:mt-4 sm:ml-auto
				md:absolute md:top-10 md:right-5
			"
			on:click={() => (showEditForm = true)}
		>
			Bearbeiten
		</button>
	</div>

	<div class="relative sm:static sm:mt-0 sm:mb-4">
		<button
			class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2 absolute sm:top-16 sm:right-5 top-20 right-5 mt-20"
			on:click={deleteFahrzeug}
		>
			Fahrzeug löschen
		</button>
	</div>
	<div class="my-5"><hr /></div>

	<!-- Auftraganlegung -->
	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 me-2 mb-"
		on:click={() => (showCard = true)}>Auftraganlegung</button
	>
	<div class="flex flex-col items-center">
		{#if showCard}
			<Card.Root class="lg:w-[700px]">
				<Card.Header>
					<Card.Title>Neuen Auftrag anlegen</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="arbeiten">Auftragnummer</Label>
								<Input type="auftragnr" bind:value={auftragnr} placeholder="100" class="max-w-xs" />
							</div>
							<div class="grid w-full items-center gap-4">
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
									<Label for="rechnung">Rechnung</Label>
									<Input
										type="rechnung"
										bind:value={rechnung}
										placeholder="Rechnung erstellen"
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
						on:click={() => (showCard = false)}
					>
						Abbrechen
					</button>
					<button
						class="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-3 py-2 me-2 mb-2"
						on:click={createAuftrag}
					>
						Speichern
					</button>
				</Card.Footer>
			</Card.Root>
		{/if}
	</div>

	<!-- Fahrzeugbearbeitung -->
	<div class="flex flex-col items-center mb-5">
		{#if showEditForm}
			<Card.Root class="lg:w-[700px]">
				<Card.Header>
					<Card.Title>Fahrzeugdaten bearbeiten</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
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
								<Label for="fin">Fahrzeugientifikationsnummer</Label>
								<Input
									type="fin"
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
									id="marke"
									bind:value={updateMarke}
									placeholder={data.fahrzeuge.Marke}
									class="max-w-xs"
								/>
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="modell">Modell</Label>
								<Input
									id="modell"
									bind:value={updateModell}
									placeholder={data.fahrzeuge.Modell}
									class="max-w-xs"
								/>
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="natcode">Nationaler Code</Label>
								<Input
									id="natcode"
									bind:value={updateNatCode}
									placeholder={data.fahrzeuge.Nat_Code}
									class="max-w-xs"
								/>
							</div>
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
						on:click={updateFahrzeug}
					>
						Speichern
					</button>
				</Card.Footer>
			</Card.Root>
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
