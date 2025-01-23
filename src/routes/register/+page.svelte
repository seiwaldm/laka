<script>
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { pb } from '$lib/pocketbase';

	// let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let vorname = '';
	let nachname = '';
	let telefonnr = '';
	let errorMessage = '';

	async function registerUser() {
		errorMessage = '';
		if (password !== passwordConfirm) {
			errorMessage = 'Passwörter stimmen nicht überein';
			return;
		}

		try {
			const data = await pb.collection('users').create({
				// username,
				email: email,
				emailVisibility: true,
				passwort: password,
				passwortConfirm: passwordConfirm,
				Vorname: vorname,
				Nachname: nachname,
				Telefonnr: telefonnr
			});
			Navigate('/login');
			console.log('Benutzer erfolgreich registiert!', user);
		} catch (error) {
			console.error('Fehler bei der Registrierung:', error);
			errorMessage = 'Fehler bei der Registrierung';
		}
	}
</script>

<div class="flex flex-col items-center">
	<Card.Root class="lg:w-[700px]">
		<Card.Header>
			<Card.Title>Registrieren</Card.Title>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="email">E-Mail</Label>
						<Input type="email" id="email" bind:value={email} placeholder="" class="max-w-xs" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="<password>">Passwort</Label>
						<Input type="password" id="password" bind:value={password} class="max-w-xs" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="passwortBestaetigen">Passwort wiederholen</Label>
						<Input
							type="password"
							id="passwordConfirm"
							bind:value={passwordConfirm}
							class="max-w-xs"
						/>
					</div>
				</div>
			</form>
		</Card.Content>

		<Card.Footer class="flex justify-between">
			<button
				class="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-3 py-2 me-2 mb-2"
				on:click={registerUser}
			>
				Speichern
			</button>
		</Card.Footer>
	</Card.Root>
</div>
