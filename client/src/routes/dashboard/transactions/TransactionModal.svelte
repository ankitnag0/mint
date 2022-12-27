<script>
	import axios from 'axios';
    import {tokenStore} from '../../store';
    
    let token;
    tokenStore.subscribe(value => token = value);

    let isModalOpen = false;

    let amount = null;
    let type = "deposit";

    const handleSubmit = async () => {
        const response = await axios.post(`http://localhost:3000/transactions/${type}`, {amount}, {
            headers: {
                authorization: 'Bearer ' + token
            }
        });
        amount = null;
        type = "deposit";
    }

    const validateInput = () => {
        if(!(!amount || !type)){
            isModalOpen = false;
            handleSubmit();
        }
    }
</script>

<input type="checkbox" id="new-transaction-modal" class="modal-toggle" bind:checked={isModalOpen}/>
<div class="modal">
  <div class="modal-box relative">
    <label for="new-transaction-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <form action="">
        <div class="form-control w-full max-w-xs mx-auto">
            <label class="label" for="amount">
              <span class="label-text">Amount</span>
            </label>
            <input type="text" placeholder="500" id="amount" class="input input-bordered w-full max-w-xs" bind:value={amount} required/>
        </div>
        <div class="form-control w-full max-w-xs mx-auto">
            <label class="label" for="type">
                <span class="label-text">Transaction Type</span>
              </label>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <input type="radio" name="type" class="radio checked:bg-blue-500" checked bind:group={type} value="deposit"/>
                  <span class="label-text">Deposit</span>
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <input type="radio" name="type" class="radio checked:bg-red-500" bind:group={type} value="withdraw"/>
                  <span class="label-text">Withdraw</span>
                </label>
              </div>
              
        </div>
        <div class="modal-action">
            <button id="submit-button" type="submit" class="btn btn-primary" on:click={validateInput}>{type}</button>
        </div>
    </form>
  </div>
</div>