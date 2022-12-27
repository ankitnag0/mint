<script>
	export let transaction;
</script>

<tr class="table-row h-20">
	<td class="table-cell px-4 py-2">{new Date(transaction.date).toDateString()}</td>
	<td class="table-cell px-4 py-2">{transaction.amount}</td>
	<td class="table-cell px-4 py-2">{transaction.type}</td>
	<td class="table-cell px-4 py-2">{transaction.status}</td>
</tr>
