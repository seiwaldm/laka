<script>
	import { page } from '$app/stores';
	export let data;
</script>

{JSON.stringify(data)}

<h1>Kunde {$page.params.kunde} > Fahrzeug {$page.params.fahrzeug}</h1>
