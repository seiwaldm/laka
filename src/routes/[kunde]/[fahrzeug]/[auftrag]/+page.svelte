<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	export let data;
</script>

<h1>
	Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug} > Auftrag {$page.params.auftrag}
</h1>

<h1>Auftrag</h1>
<div>
	{#each Object.entries(data.auftrag).filter((item) => item[0] === 'Arbeiten' || item[0] === 'BildSchaden' || item[0] === 'BildFertig' || item[0] === 'Rechnung') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]}></Attribute>
		</div>
	{/each}
</div>
{JSON.stringify(data)}
