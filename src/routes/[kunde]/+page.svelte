<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';

	const dummyData = {
		name: 'Maco Köck',
		mail: 'koeck.maco@johak.at'
	};

	let name = 'Markus Seiwald';
	let mail = 'seiwald.markus@johak.at';
</script>

<h1>Kunde {$page.params.kunde}</h1>

{#each Object.entries(dummyData) as [key, value]}
	<Attribute {key} {value}></Attribute>
{/each}

<Attribute key="Name" value={name} icon="lucide-user"></Attribute>
<Attribute key="Mail" value={mail} icon="lucide-mail"></Attribute>
