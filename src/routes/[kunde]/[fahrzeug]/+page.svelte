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

<h1>Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug}</h1>
<hr />

<div>
	<h1>Fahrzeug</h1>
	{#each Object.entries(data.fahrzeuge).filter((item) => item[0] === 'Kennzeichen' || item[0] === 'Marke' || item[0] === 'Modell' || item[0] === 'Erstzulassung' || item[0] === 'Zulassungsschein') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]}></Attribute>
		</div>
	{/each}

	<hr />
	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 me-2 mb-"
		on:click={() => (showCard = true)}>Auftraganlegung</button
	>
	<div class="">
		<!-- Auftraganlegung -->
		{#if showCard}
			<Card.Root class="w-[700px]  ">
				<Card.Header>
					<Card.Title>Neuen Auftrag anlegen</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="arbeiten">Arbeiten</Label>
								<Input type="arbeiten" placeholder="Arbeiten an..." class="max-w-xs" />
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
