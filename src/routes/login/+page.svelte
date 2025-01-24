<script>
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { pb } from '$lib/pocketbase';

	let email = '';
	let password = '';

	async function login() {
		const authData = await pb.collection('users').authWithPassword(email, password);
		console.log(authData);
		window.location.href = '/';
	}
</script>

<div class="flex flex-col items-center min-h-screen bg-gray-100 py-6">
	<Card.Root class="lg:w-[700px] shadow-lg rounded-lg bg-white">
		<Card.Header class="px-6 py-4 border-b border-gray-200">
			<Card.Title class="text-2xl font-semibold text-gray-800">Anmeldung</Card.Title>
		</Card.Header>

		<Card.Content class="px-6 py-4">
			<form>
				<div class="grid w-full gap-6">
					<!-- E-Mail -->
					<div class="flex flex-col space-y-2">
						<Label for="email" class="text-sm font-medium text-gray-700">E-Mail</Label>
						<Input
							type="email"
							bind:value={email}
							placeholder="E-Mail"
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

					<!-- Link zu Registrierung -->
					<p class="text-sm text-gray-600">
						Noch kein Konto? <a href="/register" class="text-blue-500 hover:underline"
							>Hier Registrieren</a
						>
					</p>
				</div>
			</form>
		</Card.Content>

		<Card.Footer class="px-6 py-4 border-t border-gray-200 flex justify-end">
			<button
				class="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				on:click={login}
			>
				Speichern
			</button>
		</Card.Footer>
	</Card.Root>
</div>
