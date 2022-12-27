<script>
	import { userStore, tokenStore } from './store';
	let user;
	userStore.subscribe((value) => (user = value));
	const logoutUser = () => {
		window.location.replace('/');
		userStore.set(null);
		tokenStore.set(null);
	};
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">Mint</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#if user}
				<li><a href="/dashboard">Dashboard</a></li>
				<button class="btn" on:click={logoutUser}>Logout</button>
			{:else}
				<li><a href="/login">Login</a></li>
				<li><a href="/signup">Sign Up</a></li>
			{/if}
		</ul>
	</div>
</div>
