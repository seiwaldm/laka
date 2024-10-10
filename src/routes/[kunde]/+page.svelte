<script>
	import Attribute from '$lib/components/Attribute.svelte';
	import { icons } from '$lib/icons';

	//muss definiert werden:
	export let data;
</script>

<!-- die Attribute werden in ein Array nach dem Muster [key, value] umgewandelt und dann gefiltert, damit nicht alle Attribute angezeigt werden: -->
{#each Object.entries(data).filter((item) => item[0] === 'EMail' || item[0] === 'Name' || item[0] === 'Nachname') as [key, value]}
	<Attribute {key} {value} icon={icons[key]}></Attribute>
{/each}

<div>{JSON.stringify(data)}</div>
