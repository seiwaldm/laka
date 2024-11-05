<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	export let data;
</script>

<!-- {JSON.stringify(data)} -->

<h1>Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug}</h1>
<hr />

<h1>Fahrzeug</h1>

<div>
	{#each Object.entries(data.fahrzeuge).filter((item) => item[0] === 'Kennzeichen' || item[0] === 'Marke' || item[0] === 'Modell' || item[0] === 'Erstzulassung') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]}></Attribute>
		</div>
	{/each}

	<hr />
	{#if data.auftrag.items.length > 0}
		{#each data.auftrag.items as Auftrag (Auftrag.id)}
			<a
				href="/{$page.params.kunde}/{$page.params.fahrzeug}/{Auftrag.id}"
				class="flex items-center gap-2 leading-tight"
			>
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{Auftrag.Arbeiten}
			</a>
		{/each}
	{/if}
</div>
