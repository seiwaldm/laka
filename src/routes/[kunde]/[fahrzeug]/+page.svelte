<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	export let data;
</script>

{JSON.stringify(data)}

<!-- <h1>Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug}</h1> -->
<hr />


	{#each Object.entries(data).filter((item) => item[0] === 'Vorname' || item[0] === 'Marke' || item[0] === 'Modell' || item[0] === 'Erstzulassung') as [key, value]}
		<Attribute {key} {value} icon={icons[key]}></Attribute>
	{/each}

{#if data.auftrag.items.length > 0}
	{#each data.auftrag.items as Auftrag (Auftrag.id)}
		<a href="/{$page.params.kunde}/{Auftrag.id}" class="flex items-center gap-2 leading-tight">
			<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
			{Auftrag.Arbeiten}
		</a>
	{/each}
{/if}
