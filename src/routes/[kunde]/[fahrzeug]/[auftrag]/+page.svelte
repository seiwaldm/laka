<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let data;

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;
</script>

<!-- <h1>
	Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug} > Auftrag {$page.params.auftrag}
</h1> -->

<!-- Bearbeiten Button -->
<div class="absolute top-5 right-5">
	<button
		class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2"
		on:click={() => (showEditForm = true)}
	>
		Bearbeiten
	</button>
</div>

<!-- Auftraginformationen -->
<div class="pl-5">
	<h1 class=" pt-10 pb-5 text-2xl font-bold">Auftraginformationen</h1>
	{#each Object.entries(data.auftrag).filter((item) => item[0] === 'Arbeiten' || item[0] === 'BildSchaden' || item[0] === 'BildFertig' || item[0] === 'Rechnung') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]}></Attribute>
		</div>
	{/each}
</div>

<!-- Bearbeitungsfeld -->

<div class="flex flex-col items-center">
	{#if showEditForm}
		<Card.Root class="w-[700px]  ">
			<Card.Header>
				<Card.Title>Auftragsdaten bearbeiten</Card.Title>
			</Card.Header>
			<Card.Content>
				<form>
					<div class="grid w-full items-center gap-4">
						<div class="flex flex-col space-y-1.5">
							<Label for="arbeiten">Arbeiten</Label>

							<Input type="arbeiten" placeholder="." class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="bildSchaden">Bild vom Schaden</Label>
							<Input id="bildSchaden" type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="bildFertig">Bild vom reparierten Schaden</Label>
							<Input id="bildFertig" type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="rechnung">Rechnung</Label>
							<Input type="rechnung" placeholder="Rechnung erstellen" class="max-w-xs" />
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
