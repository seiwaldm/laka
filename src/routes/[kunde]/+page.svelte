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
</script>

<div>
	<h1>Kunde</h1>
	{#each Object.entries(data).filter((item) => item[0] === 'Vorname' || item[0] === 'Nachname' || item[0] === 'EMail' || item[0] === 'Telefonnr' || item[0] === 'Strasse' || item[0] === 'Ort') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]} />
		</div>
	{/each}

	<hr />

	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 me-2 mb-"
		on:click={() => (showCard = true)}>Fahrzeuganlegung</button
	>
	<div class="">
		<!-- Fahrzeuganlegung -->
		{#if showCard}
			<Card.Root class="w-[700px]  ">
				<Card.Header>
					<Card.Title>Neues Fahrzeug anlegen</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="kennzeichen">Kennezeichen</Label>
								<Input type="kennzeichen" placeholder="JO-123AB" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="marke">Marke</Label>
								<Input type="marke" placeholder="VW" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="modell">Modell</Label>
								<Input type="modell" placeholder="Golf 7" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="erstzulassung">Erstzulassung</Label>
								<Input type="date" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="zulassungschein">Zulassungschein</Label>
								<Input id="zulassungschein" type="file" class="max-w-xs" />
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
