<script>
	import axios from "axios";
	import { tokenStore } from "../../store";

    let token;
    tokenStore.subscribe(value => token = value);

    export let id;
    export let investment;
    const closeInvestment = async () => {
        const response = await axios.delete(`http://localhost:3000/investments/${id}`, {
            headers: {
                authorization: 'Bearer ' + token
            }
        });
        console.log(response);
    }
</script>

<tr class="table-row h-20">
    <td class="table-cell px-4 py-2">{new Date(investment.date).toDateString()}</td>
    <td class="table-cell px-4 py-2">{investment.amount}</td>
    <td class="table-cell px-4 py-2">{investment.type}</td>
    <td class="table-cell px-4 py-2">{investment.duration} Months</td>
    <td class="table-cell px-4 py-2">{investment.duration * 30 - investment.daysCounter} Days</td>
    <td class="table-cell px-4 py-2">{investment.profitGenerated.toFixed(2)}</td>
    <td class="table-cell px-4 py-2">
    {#if (investment.type !== 'fixed')}
        <button class="btn" on:click={closeInvestment}>Close</button>
    {:else}
        Gotta wait, eh.
    {/if}
    </td>
</tr>