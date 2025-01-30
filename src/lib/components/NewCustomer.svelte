<script>
	import { createEventDispatcher } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let firma = '';
	let vorname = '';
	let nachname = '';
	let email = '';
	let telefonnummer = '';
	let strasse = '';
	let plz = '';
	let ort = '';
	let geschlecht = [
		{ id: 1, Geschlecht: 'Männlich' },
		{ id: 2, Geschlecht: 'Weiblich' }
	];
	let ausgewähltesGeschlecht = '';
	let isSubmitted = false;

	// Überprüfen, ob die Felder leer sind
	const validateField = (field) => field.trim() === '';

	const handleSubmit = async (event) => {
		event.preventDefault(); // Verhindert das Standardverhalten (z.B. Neuladen)
		isSubmitted = true;

		// Überprüfen, ob die erforderlichen Felder ausgefüllt sind
		if (!validateField(vorname) && !validateField(nachname)) {
			// Wenn die Felder gültig sind, das Daten speichern
			await createKunde();
			alert('Kunde erfolgreich angelegt!');
		}
	};

	const emit = createEventDispatcher();

	async function createKunde() {
		const kundenDaten = {
			action: 'createKunde',
			firma,
			vorname,
			nachname,
			email,
			telefonnummer,
			strasse,
			plz,
			ort,
			ausgewähltesGeschlecht
		};

		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(kundenDaten)
			});
			const result = await response.json();
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(kundenDaten);
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<!-- Kundenalegungsformular -->

<div
	class="fixed inset-0 w-screen min-h-screen h-max grid justify-center items-start bg-gray-700 bg-opacity-50 py-10 overflow-y-auto"
>
	<Card.Root
		class="lg:w-[700px] bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto flex flex-col"
	>
		<Card.Header class="p-4 border-b">
			<Card.Title class="text-lg font-bold">Neuen Kunden anlegen</Card.Title>
		</Card.Header>
		<Card.Content class="flex-1 overflow-y-auto p-4">
			<form on:submit={handleSubmit}>
				<div class="grid w-full items-center gap-6">
					<div class="flex flex-col space-y-1.5">
						<Label for="firma">Firma</Label>
						<Input
							id="firma"
							type="text"
							bind:value={firma}
							placeholder="Musterfirma"
							class="max-w-xs"
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="vorname">Vorname</Label>
						<Input
							id="vorname"
							type="text"
							bind:value={vorname}
							placeholder="Max"
							class="max-w-xs {isSubmitted && validateField(vorname)
								? 'border border-red-500'
								: ''}"
						/>
						{#if isSubmitted && validateField(vorname)}
							<span class="text-sm text-red-500">Bitte geben Sie einen Vornamen ein.</span>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="<nachname>">Nachname</Label>
						<Input
							id="nachname"
							type="text"
							bind:value={nachname}
							placeholder="Mustermann"
							class="max-w-xs {isSubmitted && validateField(nachname)
								? 'border border-red-500'
								: ''}"
						/>
						{#if isSubmitted && validateField(nachname)}
							<span class="text-sm text-red-500">Bitte geben Sie einen Nachnamen ein.</span>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="geschlecht">Geschlecht</Label>
						<select
							id="geschlecht"
							bind:value={ausgewähltesGeschlecht}
							placeholder="Dropdown"
							class="flex flex-col p-2 rounded-lg"
						>
							<option class="max-w-xs" value="" disabled selected>
								Bitte wähle das Geschlecht aus
							</option>
							{#each geschlecht as geschlecht}
								<option value={geschlecht.Geschlecht}>{geschlecht.Geschlecht}</option>
							{/each}
						</select>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="email">E-Mail</Label>
						<Input
							id="email"
							type="email"
							bind:value={email}
							placeholder="maxmustermann@gmail.com"
							class="max-w-xs"
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="telefonnummer">Telefonnummer</Label>
						<Input
							id="telefonnummer"
							type="telefonnummer"
							bind:value={telefonnummer}
							placeholder="0664 123456"
							class="max-w-xs"
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="strasse">Straße</Label>
						<Input
							id="strasse"
							type="text"
							bind:value={strasse}
							placeholder="Musterstraße 1"
							class="max-w-xs"
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="plz">Postleitzahl</Label>
						<Input
							id="plz"
							type="number"
							bind:value={plz}
							placeholder="Musterplz"
							class="max-w-xs"
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="ort">Ort</Label>
						<Input id="ort" type="text" bind:value={ort} placeholder="Musterort" class="max-w-xs" />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="p-4 border-t flex justify-between">
			<button
				class="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
				on:click={() => emit('hide')}
			>
				Abbrechen
			</button>
			<button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
				Speichern
			</button>
		</Card.Footer>
	</Card.Root>
</div>
