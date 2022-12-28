<script>
	let server = import.meta.env.VITE_SERVER_ADDRESS;
	import axios from 'axios';
	import { onMount } from 'svelte';
	import Transaction from './Transaction.svelte';
	import TransactionModal from './TransactionModal.svelte';

	import { tokenStore } from '../../store';
	let token;
	tokenStore.subscribe((value) => (token = value));

	let transactions = [];
	let totalWithdrawn = 0;
	let totalDeposited = 0;
	let balance = 0;

	// const delay = (delayInms) => {
	// 	return new Promise((resolve) => setTimeout(resolve, delayInms));
	// };

	const fetchTransactions = async () => {
		getItFromServer();
	};

	const getItFromServer = async () => {
		const response = await axios.get(`${server}/transactions`, {
			headers: {
				authorization: 'Bearer ' + token
			}
		});
		transactions = response.data.data;
		totalDeposited = transactions.reduce(function (total, transaction) {
			if (transaction.status === 'success' && transaction.type === 'deposit')
				return (total += transaction.amount);
			else return total;
		}, 0);
		totalWithdrawn = transactions.reduce(function (total, transaction) {
			if (transaction.status === 'success' && transaction.type === 'withdraw')
				return (total += transaction.amount);
			else return total;
		}, 0);
	};
	const fetchBalance = async () => {
		const response = await axios.get(`${server}/users/balance`, {
			headers: {
				authorization: 'Bearer ' + token
			}
		});
		balance = response.data.data;
	};

	const refresh = () => {
		fetchBalance();
		fetchTransactions();
	};

	onMount(() => {
		fetchTransactions();
		fetchBalance();
	});
</script>

<div class="rounded-md shadow-md md:p-10">
	<div class="w-full flex flex-row-reverse">
		<button class="btn" on:click={refresh}>Refresh</button>
	</div>
	<div class="flex flex-col items-center">
		<div class="flex justify-between w-full mb-4 md:flex-row flex-col">
			<div class="flex flex-col items-start m-5">
				<div class="text-lg font-bold text-gray-700">Balance</div>
				<div class="text-4xl font-bold text-gray-700">{balance.toFixed(2)}</div>
			</div>
			<div class="flex flex-col items-start m-5">
				<div class="text-lg font-bold text-gray-700">Total Deposited</div>
				<div class="text-4xl font-bold text-gray-700">{totalDeposited.toFixed(2)}</div>
			</div>
			<div class="flex flex-col items-start m-5">
				<div class="text-lg font-bold text-gray-700">Total Withdrawn</div>
				<div class="text-4xl font-bold text-gray-700">{totalWithdrawn.toFixed(2)}</div>
			</div>
		</div>
		<div class="overflow-x-auto w-full md:m-10">
			<table class="table w-full">
				<thead>
					<tr class="table-row font-bold text-gray-700">
						<th class="table-cell px-4 py-2">Date</th>
						<th class="table-cell px-4 py-2">Amount</th>
						<th class="table-cell px-4 py-2">Type</th>
						<th class="table-cell px-4 py-2">Status</th>
					</tr>
				</thead>
				<tbody>
					{#if transactions.length === 0}
						<tr>
							<td class="text-center p-20" colspan="7">
								<p class="text-3xl">No transactions</p>
							</td>
						</tr>
					{:else}
						{#each transactions as transaction}
							<Transaction {transaction} />
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
	<TransactionModal />
</div>
