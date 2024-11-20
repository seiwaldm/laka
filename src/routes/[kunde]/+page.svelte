<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';

	//muss definiert werden:
	export let data;

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;
	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren

	let showEditForm = false;

	let kennzeichen = '';
	let marke = '';
	let modell = '';
	let erstzulassung = '';
	let zulassungschein = '';
	let kundenid = $page.params.kunde;

	async function createFahrzeug() {
		const fahrzeugDaten = {
			action: 'createFahrzeug',
			kennzeichen,
			marke,
			modell,
			erstzulassung,
			zulassungschein,
			kundenid
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
		} catch (error) {
			console.error(error);
		}
		console.log(fahrzeugDaten);
	}
</script>

<div class="pl-5">
	<h1 class=" pt-10 pb-5 text-2xl font-bold">Kundeninformationen</h1>
	{#each Object.entries(data).filter((item) => item[0] === 'Vorname' || item[0] === 'Nachname' || item[0] === 'EMail' || item[0] === 'Telefonnr' || item[0] === 'Strasse' || item[0] === 'Ort') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]} />
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

	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 me-2 mb-"
		on:click={() => (showCard = true)}>Fahrzeuganlegung</button
	>
	<div class="flex flex-col items-center">
		<!-- Fahrzeuganlegung -->
		{#if showCard}
			<Card.Root class="lg:w-[700px]">
				<Card.Header>
					<Card.Title>Neues Fahrzeug anlegen</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
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
								<Label for="marke">Marke</Label>
								<Input type="marke" bind:value={marke} placeholder="VW" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="modell">Modell</Label>
								<Input type="modell" bind:value={modell} placeholder="Golf 7" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="erstzulassung">Erstzulassung</Label>
								<Input type="date" bind:value={erstzulassung} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="zulassungschein">Zulassungschein</Label>
								<Input
									id="zulassungschein"
									bind:value={zulassungschein}
									type="file"
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
						on:click={createFahrzeug}
					>
						Speichern
					</button>
				</Card.Footer>
			</Card.Root>
		{/if}
	</div>

	<!-- Bearbeitungsfeld -->

	<div class="flex flex-col items-center">
		{#if showEditForm}
			<Card.Root class="lg:w-[700px]">
				<Card.Header>
					<Card.Title>Kundendaten bearbeiten</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="vorname">Vorname</Label>
								<Input type="vorname" placeholder={data.Vorname} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="nachname">Nachname</Label>
								<Input id="nachname" placeholder={data.Nachname} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="email">E-Mail</Label>
								<Input id="email" placeholder={data.EMail} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="telefonnr">Telefonnummer</Label>
								<Input type="telefonnr" placeholder={data.Telefonnr} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="strasse">Straße</Label>
								<Input type="strasse" placeholder={data.Strasse} class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="ort">Ort</Label>
								<Input type="ort" placeholder={data.Ort} class="max-w-xs" />
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
