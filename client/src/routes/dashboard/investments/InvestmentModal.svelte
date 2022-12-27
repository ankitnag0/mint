<script>
	import axios from 'axios';
	import { tokenStore } from '../../store';

	let token;
	tokenStore.subscribe((value) => (token = value));

	let isModalOpen = false;

	let amount = null;
	let type = null;
	let duration = 0;

	const handleSubmit = async () => {
		const response = await axios.post(
			'http://localhost:3000/investments',
			{ amount, type, duration },
			{
				headers: {
					authorization: 'Bearer ' + token
				}
			}
		);
		console.log(response.data);
		amount = null;
		type = null;
		duration = 0;
	};

	const validateInput = () => {
		if (!(!amount || !type || !duration)) {
			isModalOpen = false;
			handleSubmit();
		}
	};
</script>

<input type="checkbox" id="new-investment-modal" class="modal-toggle" bind:checked={isModalOpen} />
<div class="modal">
	<div class="modal-box relative">
		<label for="new-investment-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<form action="">
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="amount">
					<span class="label-text">Amount</span>
				</label>
				<input
					type="text"
					placeholder="500"
					id="amount"
					class="input input-bordered w-full max-w-xs"
					bind:value={amount}
					required
				/>
			</div>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="type">
					<span class="label-text">Investment Type</span>
				</label>
				<select class="select w-full max-w-xs input-bordered" id="type" bind:value={type} required>
					<option disabled selected>Select Investment Type</option>
					<option value="fixed">Fixed</option>
					<option value="flexible">Flexible</option>
					<option value="secure">Secure</option>
				</select>
			</div>
			<div class="form-control w-full max-w-xs mx-auto">
				<label class="label" for="duration">
					<span class="label-text">Duration</span>
				</label>
				<input
					type="range"
					min="0"
					max="12"
					class="range"
					step="1"
					id="duration"
					bind:value={duration}
					required
				/>
				<div class="w-full flex justify-between text-xs px-2">
					<span>0</span>
					<span>|</span>
					<span>|</span>
					<span>3</span>
					<span>|</span>
					<span>|</span>
					<span>6</span>
					<span>|</span>
					<span>|</span>
					<span>9</span>
					<span>|</span>
					<span>|</span>
					<span>12</span>
				</div>
			</div>
			<div class="modal-action">
				<button id="submit-button" type="submit" class="btn btn-primary" on:click={validateInput}
					>Invest</button
				>
			</div>
		</form>
	</div>
</div>
