<script>
    import { createEventDispatcher } from 'svelte';
	
    const dispatch = createEventDispatcher();
	
    export let isOpenModal;
    export let result;
    export let nftLeft;
    export let nftRight;

    function onClickNext() {
        closeModal();
    }
	
    function closeModal() {
        isOpenModal = false;
        dispatch('closeModal', { isOpenModal });
    }
</script>

<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
    <div id="wrapper">
        {#if result === 'win'}
            <h2>You win !</h2>
        {:else if result === 'lose'}
            <h2>You lose...</h2>
        {:else}
            <h2>Draw</h2>
        {/if}
        <button on:click={onClickNext}>
            Next
        </button>
    </div>
</div>

<style>
    #modal {
        display: var(--display);
       	position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 8px;
        filter: drop-shadow(0 0 20px #333);
        padding: 12px;
    }

    #wrapper {
        width: 100%;
    }
</style>