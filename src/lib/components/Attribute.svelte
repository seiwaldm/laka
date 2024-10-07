<script>
	import 'iconify-icon';

	export let key;
	export let value;
	export let icon;
</script>

<div class="flex items-center gap-2">
	<iconify-icon {icon} class="text-4xl"></iconify-icon>
	<div class="leading-tight">
		<p class="font-semibold">{key}</p>
		<p>{value}</p>
	</div>
</div>
