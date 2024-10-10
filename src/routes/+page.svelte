<script>
	export let data;
</script>

<h1>Kunden</h1>
{#each data.kunden as kunde}
	<a href="/{kunde.id}" class="flex items-center gap-2">
		<iconify-icon icon="lucide-user" class="text-4xl"></iconify-icon>
		{kunde.Name}
		{kunde.Nachname}
	</a>
{/each}
<hr />
{JSON.stringify(data)}
