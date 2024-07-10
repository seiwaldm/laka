<script>
	import { Button } from '$lib/components/ui/button';
	function sayHello() {
		alert('Hello World!');
	}
</script>

<Button variant="outline" on:click={sayHello}>Say Hello</Button>
<Button>Button</Button>
<Button variant="destructive">Destructive</Button>
