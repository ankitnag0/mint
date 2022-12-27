<!-- TabBar.svelte -->
<script>
	import UserInfo from './userinfo/UserInfo.svelte';
	import Investments from './investments/Investments.svelte';
	import Transactions from './transactions/Transactions.svelte';

	export let user;

	let activeTab = 'user-info';

	function handleTabClick(event) {
		activeTab = event.target.dataset.tab;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="tabs bg-gray-200 p-4 tabs-boxed flex justify-between">
	<div class="flex flex-col md:flex-row">
		<div
			class="tab"
			data-tab="user-info"
			on:click={handleTabClick}
			class:tab-active={activeTab === 'user-info'}
		>
			User Info
		</div>
		<div
			class="tab"
			data-tab="investments"
			on:click={handleTabClick}
			class:tab-active={activeTab === 'investments'}
		>
			Investments
		</div>
		<div
			class="tab"
			data-tab="transactions"
			on:click={handleTabClick}
			class:tab-active={activeTab === 'transactions'}
		>
			Transactions
		</div>
	</div>
	<div>
		{#if activeTab === 'investments'}
			<label class="btn" for="new-investment-modal"> New Investment </label>
		{:else if activeTab === 'transactions'}
			<label class="btn" for="new-transaction-modal"> New Transaction </label>
		{:else}
			<label class="btn" for="edit-user-info-modal"> Edit Profile </label>
		{/if}
	</div>
</div>

{#if activeTab === 'user-info'}
	<UserInfo {user} />
{:else if activeTab === 'investments'}
	<Investments />
{:else if activeTab === 'transactions'}
	<Transactions />
{/if}
