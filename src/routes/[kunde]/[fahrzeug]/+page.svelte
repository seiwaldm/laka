<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	//muss definiert werden:
	export let data;

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;

	let arbeiten = '';
	let bildSchaden = '';
	let bildFertig = '';
	let rechnung = '';
	let fahrzeugid = $page.params.fahrzeug;

	async function createAuftrag() {
		const auftragDaten = {
			action: 'createAuftrag',
			arbeiten,
			bildSchaden,
			bildFertig,
			rechnung,
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
		} catch (error) {
			console.error(error);
		}
		console.log(auftragDaten);
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
	<h1 class=" pt-10 pb-5 text-2xl font-bold">Fahrzeuginformationen</h1>
	{#each Object.entries(data.fahrzeuge).filter((item) => item[0] === 'Kennzeichen' || item[0] === 'Marke' || item[0] === 'Modell' || item[0] === 'Erstzulassung' || item[0] === 'Zulassungsschein') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]}></Attribute>
		</div>
	{/each}

	<!-- Bearbeiten Button -->
	<div class="relative sm:static sm:mt-0 sm:mb-4">
		<button
			class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2 absolute sm:top-16 sm:right-5 top-20 right-5"
			on:click={() => (showEditForm = true)}
		>
			Bearbeiten
		</button>
	</div>

	<hr />

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

	<!-- Auftragbearbeitung -->
	<div class="flex flex-col items-center">
		{#if showEditForm}
			<Card.Root class="lg:w-[700px]">
				<Card.Header>
					<Card.Title>Fahrzeugdaten bearbeiten</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="kennzeichen">Kennzeichen</Label>
								<Input
									type="kennzeichen"
									placeholder={data.fahrzeuge.Kennzeichen}
									class="max-w-xs"
								/>
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="marke">Marke</Label>
								<Input id="marke" placeholder={data.fahrzeuge.Marke} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="modell">Modell</Label>
								<Input id="modell" placeholder={data.fahrzeuge.Modell} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="erstzulassung">Erstzulassung</Label>
								<Input
									type="erstzulassung"
									placeholder={data.fahrzeuge.Erstzulassung}
									class="max-w-xs"
								/>
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="zulassungschein">Zulassungsschein</Label>
								<Input
									type="zulassungschein"
									placeholder={data.fahrzeuge.Zulassungsschein}
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
					<button class="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-3 py-2 me-2 mb-2">
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
