<script>
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	let kundennr = '';
	let firma = '';
	let vorname = '';
	let nachname = '';
	let email = '';
	let telefonnummer = '';
	let strasse = '';
	let plz = '';
	let ort = '';

	async function createKunde() {
		const kundenDaten = {
			action: 'createKunde',
			kundennr,
			firma,
			vorname,
			nachname,
			email,
			telefonnummer,
			strasse,
			plz,
			ort
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
		} catch (error) {
			console.error(error);
		}
		console.log(kundenDaten);
	}
</script>

<Card.Root class="lg:w-[700px]">
	<Card.Header>
		<Card.Title>Neuen Kunden anlegen</Card.Title>
	</Card.Header>
	<Card.Content>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="kundennr">Kundennummer</Label>
					<Input type="kundennr" bind:value={kundennr} placeholder="1000" class="max-w-xs" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="firma">Firma</Label>
					<Input type="firma" bind:value={firma} placeholder="Musterfirma" class="max-w-xs" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="vorname">Vorname</Label>
					<Input type="vorname" bind:value={vorname} placeholder="Max" class="max-w-xs" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="<nachname>">Nachname</Label>
					<Input type="nachname" bind:value={nachname} placeholder="Mustermann" class="max-w-xs" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="email">E-Mail</Label>
					<Input
						type="email"
						bind:value={email}
						placeholder="maxmustermann@gmail.com"
						class="max-w-xs"
					/>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="telefonnummer">Telefonnummer</Label>
					<Input
						type="telefonnummer"
						bind:value={telefonnummer}
						placeholder="0664 123456"
						class="max-w-xs"
					/>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="strasse">Straße</Label>
					<Input
						type="strasse"
						bind:value={strasse}
						placeholder="Musterstraße 1"
						class="max-w-xs"
					/>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="plz">Postleitzahl</Label>
					<Input type="plz" bind:value={plz} placeholder="Musterplz" class="max-w-xs" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="ort">Ort</Label>
					<Input type="ort" bind:value={ort} placeholder="Musterort" class="max-w-xs" />
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
			on:click={createKunde}
		>
			Speichern
		</button>
	</Card.Footer>
</Card.Root>
