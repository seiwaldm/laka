<script>
	export let data;
</script>

<main>
	<h1>Kunden</h1>
	{#each data.kunden as kunde (kunde.id)}
		<a href="/{kunde.id}" class="flex items-center gap-2">
			<iconify-icon icon="lucide-user" class="text-4xl"></iconify-icon>

			{kunde.Nachname}
			{kunde.Vorname}
		</a>
	{/each}
	<hr />
	{JSON.stringify(data)}
</main>
