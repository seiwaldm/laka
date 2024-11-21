<script>
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { pb } from '$lib/pocketbase';
	import { error } from '@sveltejs/kit';

	let email = '';
	let passwort = '';
	let passwortBestätigen = '';
	let vornamen = '';
	let nachnamen = '';
	let errorMessage = '';

	async function registerUser() {
		errorMessage = '';
		if (passwort !== passwortBestätigen) {
			errorMessage = 'Passwörter stimmen nicht überein';
			return;
		}

		try {
			const user = await pb.collection('users').create({
				email,
				passwort,
				passwortBestätigen,
				vornamen,
				nachnamen,
				isAdmin: false
			});
		} catch (error) {
			console.error(error);
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

						<Input type="email" bind:value={email} placeholder="" class="max-w-xs" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="<passwort>">Passwort</Label>

						<Input type="password" id="passwort" bind:value={passwort} class="max-w-xs" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="passwortBestätigen">Passwort wiederholen</Label>
						<Input
							type="password"
							id="passwortBestätigung"
							bind:value={passwortBestätigen}
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
