<script>
	import Header from './Header.svelte';
	import '../app.postcss';
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>
</div>
