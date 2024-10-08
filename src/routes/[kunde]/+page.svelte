<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	const dummyData = {
		name: 'Maco Köck',
		mail: 'koeck.maco@johak.at'
	};
</script>

<h1>Kunde {$page.params.kunde}</h1>

{#each Object.entries(dummyData) as [key, value]}
	<Attribute {key} {value} icon={icons[key]}></Attribute>
{/each}
