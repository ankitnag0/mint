<script>
	import axios from 'axios';
	import rocket from '$lib/assets/Rocket.gif';
	import error404 from '$lib/assets/error404.png';

	import { userStore, tokenStore } from '../store';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	let isLoading = false;
	let isFailed = false;

	const handleSubmit = async () => {
		isLoading = true;
		try {
			const response = await axios.post('http://localhost:3000/users/login', { email, password });
			userStore.set(response.data.user);
			tokenStore.set(response.data.token);
			isLoading = false;
			goto('/dashboard');
		} catch (error) {
			console.log(error);
			isLoading = false;
			isFailed = true;
		}
	};
</script>

<div class="lg:w-9/12 mx-auto p-10">
	{#if isFailed}
		<div svelte:loading class="flex justify-center items-center flex-grow h-screen">
			<img src={error404} alt="error-404" />
		</div>
	{:else if isLoading}
		<div svelte:loading class="flex justify-center items-center flex-grow h-screen">
			<img src={rocket} alt="rocket-loading" />
		</div>
	{:else}
		<form
			class="lg:w-1/2 mx-auto flex flex-col content-center"
			on:submit|preventDefault={handleSubmit}
		>
			<h1 class="text-2xl text-center">Login</h1>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="email">
					<span class="label-text">Email</span>
				</label>
				<input
					type="email"
					placeholder="Email"
					id="email"
					bind:value={email}
					required
					class="input input-bordered w-full max-w-xs"
					autocomplete="username"
				/>
			</div>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="Password"
					id="password"
					bind:value={password}
					required
					class="input input-bordered w-full max-w-xs"
					autocomplete="current-password"
				/>
			</div>
			<div class="form-control mx-auto p-5">
				<button class="btn btn-active btn-primary">Login to Dashboard</button>
			</div>
		</form>
	{/if}
</div>
