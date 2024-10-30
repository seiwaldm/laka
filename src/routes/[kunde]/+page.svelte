<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	//muss definiert werden:
	export let data;
</script>

<!-- {JSON.stringify(data)} -->

<!-- die Attribute werden in ein Array nach dem Muster [[key1, value1], [key2, value2], ...] umgewandelt und dann gefiltert, damit nicht alle Attribute angezeigt werden: -->
{#each Object.entries(data).filter((item) => item[0] === 'EMail' || item[0] === 'Vorname' || item[0] === 'Nachname' || item[0] === 'Telefonnr') as [key, value]}
	<Attribute {key} {value} icon={icons[key]}></Attribute>
{/each}

<hr />

{#if data.fahrzeuge.items.length > 0}
	{#each data.fahrzeuge.items as fahrzeug (fahrzeug.id)}
		<a href="/{$page.params.kunde}/{fahrzeug.id}" class="flex items-center gap-2 leading-tight">
			<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
			{fahrzeug.Marke}
			{fahrzeug.Modell} <br />EZ: {fahrzeug.Erstzulassung}</a
		>
	{/each}
{/if}
