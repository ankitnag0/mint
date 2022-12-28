<script>
	let server = import.meta.env.VITE_SERVER_ADDRESS;
	import axios from 'axios';
	import { tokenStore } from '../../store';

	let token;
	tokenStore.subscribe((value) => (token = value));

	let isModalOpen = false;

	export let bankAccountNumber;
	export let ifscCode;
	export let panCard;
	export let address;

	const handleSubmit = async () => {
		console.log('making request');
		await axios.put(
			`${server}/users`,
			{
				bankDetails: {
					bankAccountNumber,
					ifscCode,
					panCard
				},
				address
			},
			{
				headers: {
					authorization: 'Bearer ' + token
				}
			}
		);
		// bankAccountNumber = null;
		// ifscCode = null;
		// panCard = null;
		// address = null;
	};

	const validateInput = () => {
		if (!(!bankAccountNumber || !ifscCode || !panCard)) {
			isModalOpen = false;
			handleSubmit();
		} else {
			// console.log('empty fields')
		}
	};
</script>

<input type="checkbox" id="edit-user-info-modal" class="modal-toggle" bind:checked={isModalOpen} />
<div class="modal">
	<div class="modal-box relative">
		<label for="edit-user-info-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<form action="">
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="bankAccountNumber">
					<span class="label-text">Account Number</span>
				</label>
				<input
					type="text"
					placeholder="Bank Account Number"
					id="bankAccountNumber"
					class="input input-bordered w-full max-w-xs"
					bind:value={bankAccountNumber}
					required
				/>
			</div>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="ifscCode">
					<span class="label-text">IFSC Code</span>
				</label>
				<input
					type="text"
					placeholder="IFSC Code"
					id="ifscCode"
					class="input input-bordered w-full max-w-xs"
					bind:value={ifscCode}
					required
				/>
			</div>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="panCard">
					<span class="label-text">PAN Number</span>
				</label>
				<input
					type="text"
					placeholder="PAN Card Number"
					id="panCard"
					class="input input-bordered w-full max-w-xs"
					bind:value={panCard}
					required
				/>
			</div>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="address">
					<span class="label-text">Address</span>
				</label>
				<input
					type="text"
					placeholder="Address"
					id="address"
					class="input input-bordered w-full max-w-xs"
					bind:value={address}
					required
				/>
			</div>

			<div class="modal-action">
				<button id="submit-button" type="submit" class="btn btn-primary" on:click={validateInput}
					>Update</button
				>
			</div>
		</form>
	</div>
</div>
