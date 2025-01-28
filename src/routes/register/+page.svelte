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

		if (password.length < 8) {
			errorMessage = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
			return;
		}

		if (password !== passwordConfirm) {
			errorMessage = 'Passwörter stimmen nicht überein';
			return;
		}

		try {
			const user = await pb.collection('users').create({
				email,
				emailVisibility: true,
				password,
				passwordConfirm,
				Vorname: vorname,
				Nachname: nachname,
				Telefonnr: telefonnr
			});
			window.location.href = '/login';
			console.log('Benutzer erfolgreich registiert!', user);
		} catch (error) {
			console.error('Fehler bei der Registrierung:', error);
			errorMessage = 'Fehler bei der Registrierung';
		}
	}
</script>

<div class="flex flex-col items-center min-h-screen bg-gray-100 py-6">
	<Card.Root class="lg:w-[700px] shadow-lg rounded-lg bg-white">
		<Card.Header class="px-6 py-4 border-b border-gray-200">
			<Card.Title class="text-2xl font-semibold text-gray-800">Registrieren</Card.Title>
		</Card.Header>

		<Card.Content class="px-6 py-4">
			<form>
				<div class="grid w-full gap-6">
					<!-- Vorname -->
					<div class="flex flex-col space-y-2">
						<Label for="vorname" class="text-sm font-medium text-gray-700">Vorname</Label>
						<Input
							type="text"
							id="vorname"
							bind:value={vorname}
							placeholder="Vorname"
							class="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<!-- Nachname -->
					<div class="flex flex-col space-y-2">
						<Label for="nachname" class="text-sm font-medium text-gray-700">Nachname</Label>
						<Input
							type="text"
							id="nachname"
							bind:value={nachname}
							placeholder="Nachname"
							class="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<!-- E-Mail -->
					<div class="flex flex-col space-y-2">
						<Label for="email" class="text-sm font-medium text-gray-700">E-Mail</Label>
						<Input
							type="email"
							id="email"
							bind:value={email}
							placeholder="E-Mail"
							class="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<!-- Telefonnummer -->
					<div class="flex flex-col space-y-2">
						<Label for="telefonnr" class="text-sm font-medium text-gray-700">Telefonnummer</Label>
						<Input
							type="text"
							id="telefonnr"
							bind:value={telefonnr}
							placeholder="Telefonnummer"
							class="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<!-- Passwort -->
					<div class="flex flex-col space-y-2">
						<Label for="password" class="text-sm font-medium text-gray-700">Passwort</Label>
						<Input
							type="password"
							id="password"
							bind:value={password}
							placeholder="Passwort"
							class="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<!-- Passwort bestätigen -->
					<div class="flex flex-col space-y-2">
						<Label for="passwordConfirm" class="text-sm font-medium text-gray-700"
							>Passwort bestätigen</Label
						>
						<Input
							type="password"
							id="passwordConfirm"
							bind:value={passwordConfirm}
							placeholder="Passwort bestätigen"
							class="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<!-- Link zu Anmeldung -->
					<p class="text-sm text-gray-600">
						Du hast schon ein Konto? <a href="/login" class="text-blue-500 hover:underline"
							>Hier Anmelden</a
						>
					</p>
				</div>
			</form>
		</Card.Content>

		<Card.Footer class="px-6 py-4 border-t border-gray-200 flex justify-end">
			<button
				class="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				on:click={registerUser}
			>
				Speichern
			</button>
		</Card.Footer>
	</Card.Root>
</div>
