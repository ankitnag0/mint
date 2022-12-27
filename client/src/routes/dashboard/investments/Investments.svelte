<script>
    import axios from 'axios';
	  import { onMount } from 'svelte';
    import Investment from './Investment.svelte'
    import InvestmentModal from './InvestmentModal.svelte';

    import {tokenStore} from '../../store';
    let token;
    tokenStore.subscribe(value => {
      token = value;
    });
    
    let cache = {};
    let investments = [];
    let investmentsToDisplay = [];
    let totalInvestments = 0;
    let liveProfits = 0;
    let pastProfits = 0;
    

    const fetchInvestments = async () => {
      if(cache.investments){
        investments = cache.investments;
        return;
      }
      getItFromServer();
    }

    const getItFromServer = async () => {
      const response = await axios.get('http://localhost:3000/investments', {
        headers: {
          authorization: 'Bearer ' + token
        }
      });
      cache.investments = investments;
      investments = response.data.data;
      investmentsToDisplay = investments.filter(investment => investment.closingDate === null);
      totalInvestments = investments.reduce(function(total, investment){
        if(investment.closingDate === null) return total + investment.amount;
        else return total;
      }, 0)
      liveProfits = investments.reduce(function(total, investment){
        if(investment.closingDate === null) return total + investment.profitGenerated;
        else return total;
      },0);
      pastProfits = investments.reduce(function(total, investment){
        if(investment.closingDate !== null) return total += investment.profitGenerated;
        else return total += 0;
      }, 0);
    }

    onMount(fetchInvestments);
</script>

<div class="rounded-md shadow-md p-10">
    <div class="w-full flex flex-row-reverse"><button class="btn" on:click={getItFromServer}>Refresh</button></div>
    <div class="flex flex-col items-center">
        <div class="flex justify-between w-full mb-4">
          <div class="flex flex-col items-start">
            <div class="text-lg font-bold text-gray-700">Total Investment</div>
            <div class="text-4xl font-bold text-gray-700">{totalInvestments}</div>
          </div>
          <div class="flex flex-col items-start">
            <div class="text-lg font-bold text-gray-700">Profit Generated</div>
            <div class="text-4xl font-bold text-gray-700">{liveProfits.toFixed(2)}</div>
          </div>
          <div class="flex flex-col items-start">
            <div class="text-lg font-bold text-gray-700">Lifetime Profit Generated</div>
            <div class="text-4xl font-bold text-gray-700">{pastProfits.toFixed(2)}</div>
          </div>
        </div>
        <table class="table w-full m-10">
            <thead>
                <tr class="table-row font-bold text-gray-700">
                  <th class="table-cell px-4 py-2">Date</th>
                  <th class="table-cell px-4 py-2">Amount</th>
                  <th class="table-cell px-4 py-2">Type</th>
                  <th class="table-cell px-4 py-2">Duration</th>
                  <th class="table-cell px-4 py-2">Time Left</th>
                  <th class="table-cell px-4 py-2">Profit Generated</th>
                  <th class="table-cell px-4 py-2">Close</th>
                </tr>
            </thead>
            <tbody>
                {#if (investments.length === 0)}
                  <tr>
                    <td class="text-center p-20" colspan="7">
                      <p class="text-3xl">No investments</p>
                    </td>
                  </tr>
                {:else}
                  {#each investmentsToDisplay as investment}
                    <Investment id={investment._id} {investment}/>
                  {/each}
                {/if}
            </tbody>
          </table>
    </div>
    <InvestmentModal/>
</div>

