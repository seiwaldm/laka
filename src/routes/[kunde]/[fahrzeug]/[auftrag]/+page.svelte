<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	export let data;
</script>

<h1>
	Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug} > Auftrag {$page.params.auftrag}
</h1>

{#each Object.entries(data).filter((item) => item[0] === 'Arbeiten' || item[0] === 'BildSchaden' || item[0] === 'BildFertig' || item[0] === 'Rechnung') as [key, value]}
	<Attribute {key} {value} icon={icons[key]}></Attribute>
{/each}
