<script>
	import { page } from '$app/stores';
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	export let data;
</script>

<!-- <h1>
	Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug} > Auftrag {$page.params.auftrag}
</h1> -->

<div class="pl-5">
	<h1 class=" pt-10 pb-5 text-2xl font-bold">Auftraginformationen</h1>
	{#each Object.entries(data.auftrag).filter((item) => item[0] === 'Arbeiten' || item[0] === 'BildSchaden' || item[0] === 'BildFertig' || item[0] === 'Rechnung') as [key, value]}
		<div style="margin-bottom: 1rem;">
			<Attribute {key} {value} icon={icons[key]}></Attribute>
		</div>
	{/each}
</div>
