<script>
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { pb } from '$lib/pocketbase';

    let email = '';
    let passwort = '';

    async function login() {
        const authData = await pb.collection('users').authWithPassword(email, passwort);
        console.log(authData);
    }
</script>

<div class="flex flex-col items-center">
	<Card.Root class="lg:w-[700px]">
		<Card.Header>
			<Card.Title>Anmelden</Card.Title>
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
				</div>
			</form>
		</Card.Content>

		<Card.Footer class="flex justify-between">
			<button
				class="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-3 py-2 me-2 mb-2"
				on:click={login}
			>
				Speichern
			</button>
		</Card.Footer>
	</Card.Root>
</div>