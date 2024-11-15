<script>
	export let data;

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;
</script>

<main>
	<button
		type="button"
		class="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 me-2 mb-"
		on:click={() => (showCard = true)}>Kundenanlegung</button
	>
	<div class="">
		<!-- Kundenanlegung -->
		{#if showCard}
			<Card.Root class="w-[700px]  ">
				<Card.Header>
					<Card.Title>Neuen Kunden anlegen</Card.Title>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="vorname">Vorname</Label>
								<Input type="vorname" placeholder="Max" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="<nachname>">Nachname</Label>
								<Input type="nachname" placeholder="Mustermann" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="email">E-Mail</Label>
								<Input type="email" placeholder="maxmustermann@gmail.com" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="telefonnummer">Telefonnummer</Label>
								<Input type="telefonnummer" placeholder="0664 123456" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="strasse">Straße</Label>
								<Input type="strasse" placeholder="Musterstraße 1" class="max-w-xs" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="ort">Ort</Label>
								<Input type="ort" placeholder="Musterort" class="max-w-xs" />
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

	{#each data.kunden as kunde (kunde.id)}
		<a href="/{kunde.id}" class="flex items-center gap-2">
			<iconify-icon icon="lucide-user" class="text-4xl"></iconify-icon>

			{kunde.Nachname}
			{kunde.Vorname}
		</a>
	{/each}
	<hr />
</main>
