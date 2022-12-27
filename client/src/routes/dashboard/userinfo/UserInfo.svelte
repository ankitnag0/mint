<script>
	import axios from "axios";
	import { tokenStore, userStore } from "../../store";
	import UserInfoModal from "./UserInfoModal.svelte";

    export let user;
    let token;
    tokenStore.subscribe(value => token = value);
    // userStore.subscribe(value => user = value);
    const getUserInfo = async () => {
        const response = await axios.get('http://localhost:3000/users/me/refresh', {
            headers: {
                authorization: 'Bearer ' + token
            }
        });
        user = response.data.data;
        userStore.set(user);
    }
    
</script>

<div class="rounded-md shadow-md p-10">
    <div class="w-full flex flex-row-reverse"><button class="btn" on:click={getUserInfo}>Refresh</button></div>
    <div class="flex md:flex-row justify-between items-center mx-auto">
        <div class="p-4 mx-auto flex justify-between">
            <div class="flex justify-between mb-4">
                <div class="w-1/4 rounded-full overflow-hidden">
                    <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="profile" class="w-full h-full object-cover">
                </div>
                <div class="">
                    <h3 class="text-2xl font-bold leading-tight">{user.name}</h3>
                    <p class="text-gray-600">{user.email}</p>
                    <p class="text-gray-600">{user.phoneNumber}</p>
                </div>
                {#if user.bankDetails}
                <div class="">
                    <div class="text-xl font-bold mb-2">Bank Details</div>
                    <div><span class="mr-5 font-semibold w-1/2">Account Number</span><span class=" w-1/2">{user.bankDetails.bankAccountNumber}</span></div>
                    <div><span class="mr-5 font-semibold w-1/2">IFSC Code</span><span class=" w-1/2">{user.bankDetails.ifscCode}</span></div>
                    <div><span class="mr-5 font-semibold w-1/2">PAN Number</span><span class=" w-1/2">{user.bankDetails.panCard}</span></div>
                </div>
                {:else}
                <div class="">
                    <div class="text-xl font-bold mb-2">Bank Details</div>
                    <div><span class="mr-5 font-semibold w-1/2">Account Number</span><span class=" w-1/2">Not Added Yet</span></div>
                    <div><span class="mr-5 font-semibold w-1/2">IFSC Code</span><span class=" w-1/2">Not Added Yet</span></div>
                    <div><span class="mr-5 font-semibold w-1/2">PAN Number</span><span class=" w-1/2">Not Added Yet</span></div>
                </div>
                {/if}
                {#if user.address}
                <div class="">
                    <div class="text-xl font-bold mb-2">Address</div>
                    <div class="text-gray-600">{user.address}</div>
                </div>
                {:else}
                <div class="">
                    <div class="text-xl font-bold mb-2">Address</div>
                    <div class="text-gray-600">Not Added Yet</div>
                </div>
                {/if}

            </div>

        </div>
    </div>
    {#if user.bankDetails}
    <UserInfoModal bankAccountNumber={user.bankDetails.bankAccountNumber} ifscCode={user.bankDetails.ifscCode} panCard={user.bankDetails.panCard} address={user.address} />
    {:else}
    <UserInfoModal bankAccountNumber={null} ifscCode={null} panCard={null} address={null}/>
    {/if}
</div>