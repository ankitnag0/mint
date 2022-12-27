<script>
	import TabBar from './TabBar.svelte';
	import { userStore } from '../store.js';

	let user;

	userStore.subscribe((value) => {
		user = value;
	});
</script>

<div class="lg:w-9/12 mx-auto p-10">
	<TabBar {user} />
</div>
