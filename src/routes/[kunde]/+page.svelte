<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	//muss definiert werden:
	export let data;
</script>

<!-- {JSON.stringify(data)} -->

<h1 style="font-size: 1.8rem; padding-left: 2rem;  margin-bottom: 1rem;">Kunde</h1>
<!-- >>>>>>> db475282a08d461639c5226c129974de8e476e7b -->
<!-- die Attribute werden in ein Array nach dem Muster [[key1, value1], [key2, value2], ...] umgewandelt und dann gefiltert, damit nicht alle Attribute angezeigt werden: -->

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
<div style="padding-left: 2rem;">
	{#each Object.entries(data).filter((item) => item[0] === 'Vorname' || item[0] === 'Nachname' || item[0] === 'EMail' || item[0] === 'Telefonnr' || item[0] === 'Strasse' || item[0] === 'Ort') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]} />
		</div>
<!-- >>>>>>> db475282a08d461639c5226c129974de8e476e7b -->
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
</div>
