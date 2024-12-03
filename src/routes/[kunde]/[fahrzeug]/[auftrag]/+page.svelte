<script>
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import 'iconify-icon';
	import { onMount } from 'svelte';

	export let data;

	function openCloudinaryWidget() {
		let cloudinaryWidget = cloudinary.createUploadWidget(
			{
				cloudName: 'seiwaldm',
				uploadPreset: 'zqnhbbpy'
			},
			(error, result) => {
				if (!error && result && result.event === 'success') {
					console.log('Done! Here is the image info: ', result.info);
				}
			}
		);

		cloudinaryWidget.open();
	}

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;

	let updateAuftragid = $page.params.auftrag;
	let updateArbeiten = '';
	let updateBildSchaden = '';
	let updateBildFertig = '';
	let updateRechnung = '';
	let updateFahrzeugid = $page.params.fahrzeug;
	let updateAuftragnr = '';

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

	async function deleteAuftrag() {
		await pb.collection('Auftrag').delete($page.params.auftrag);
	}
</script>

<svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/latest/global/all.js"
		type="text/javascript"
	></script>
</svelte:head>

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

<div class="my-5"><hr /></div>

<!-- <button on:click={openCloudinaryWidget}><iconify-icon icon="lucide:camera"></iconify-icon></button> -->

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
		class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2 absolute sm:top-16 sm:right-5 top-20 right-5"
		on:click={deleteAuftrag}
	>
		Auftrag löschen
	</button>
</div>

<!-- Auftraginformationen  -->
<div class="pl-5">
	<h1 class=" my-5 text-2xl font-bold">Auftraginformationen</h1>
	{#each Object.entries(data.auftrag).filter((item) => item[0] === 'Auftragnummer' || item[0] === 'Arbeiten' || item[0] === 'BildSchaden' || item[0] === 'BildFertig' || item[0] === 'Rechnung') as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<iconify-icon icon={icons[key]} class="mr-2 text-2xl translate-y-1"></iconify-icon>
			<span class="font-bold">{key}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}
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
					<div class="grid w-full items-center gap-4">
						<div class="flex flex-col space-y-1.5">
							<Label for="arbeiten">Arbeiten</Label>
							<Input
								type="arbeiten"
								bind:value={updateArbeiten}
								placeholder={data.auftrag.Arbeiten}
								class="max-w-xs"
							/>
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="bildSchaden">Bild vom Schaden</Label>
							<Input id="bildSchaden" type="file" bind:value={updateBildSchaden} class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="bildFertig">Bild vom reparierten Schaden</Label>
							<Input id="bildFertig" type="file" bind:value={updateBildFertig} class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="rechnung">Rechnung</Label>
							<Input
								type="rechnung"
								bind:value={updateRechnung}
								placeholder={data.auftrag.Rechnung}
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
					on:click={updateAuftrag}
				>
					Speichern
				</button>
			</Card.Footer>
		</Card.Root>
	{/if}
</div>
