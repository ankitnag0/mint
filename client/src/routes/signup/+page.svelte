<script>
	import axios from 'axios';
	import rocket from '$lib/assets/Rocket.gif';
	import error404 from '$lib/assets/error404.png';

	import { goto } from '$app/navigation';
	import { userStore, tokenStore } from '../store';

	let name;
	let email;
	let phoneNumber;
	let password;

	let isLoading = false;
	let isSuccess = false;
	let isFailed = false;

	const handleSubmit = async () => {
		// if(!name || !email || !phoneNumber || !password){
		//   return
		// }
		isLoading = true;
		try {
			console.log({ name, email, phoneNumber, password });
			const response = await axios.post('http://localhost:3000/users', {
				name,
				email,
				phoneNumber,
				password
			});
			userStore.set(response.data.user);
			tokenStore.set(response.data.token);
			goto('/dashboard');
			isSuccess = true;
			isLoading = false;
		} catch (error) {
			isLoading = false;
			isFailed = true;
		}
	};

	const gotoDashBoard = async () => {};
</script>

<div class="lg:w-9/12 mx-auto p-10">
	{#if isSuccess}
		<div class="text-center p-5">
			<p class="mb-2">Congratulations!!! Your account has been created.</p>
			<button class="btn btn-active btn-primary" on:click={gotoDashBoard}>Go to Dashboard</button>
		</div>
	{:else if isFailed}
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
			<h1 class="text-2xl text-center">Sign Up</h1>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="name">
					<span class="label-text">Name</span>
				</label>
				<input
					type="text"
					placeholder="Name"
					id="name"
					bind:value={name}
					required
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
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
				<label class="label" for="phoneNumber">
					<span class="label-text">Phone Number</span>
				</label>
				<input
					type="number"
					placeholder="Phone"
					id="phoneNumber"
					bind:value={phoneNumber}
					required
					class="input input-bordered w-full max-w-xs"
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
				<button class="btn btn-active btn-primary">Create Account</button>
			</div>
		</form>
	{/if}
</div>
