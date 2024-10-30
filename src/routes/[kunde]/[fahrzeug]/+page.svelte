<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	export let data;
</script>

{JSON.stringify(data)}

<h1>Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug}</h1>


{#each Object.entries(data).filter((item) => item[0] === 'Kennzeichen' || item[0] === 'Marke' || item[0] === 'Modell' || item[0] === 'Erstzulassung') as [key, value]}
	<Attribute {key} {value} icon={icons[key]}></Attribute>
{/each}
