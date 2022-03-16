<script>
    import { createEventDispatcher } from 'svelte';
    import { ethers } from 'ethers';
	
    const dispatch = createEventDispatcher();
	
    export let result;
    export let nftLeft;
    export let nftLeftPrice;
    export let nftRight;
    export let nftRightPrice;

    function clickNext() {
        closeModal();

        dispatch('clickNext');
    }
	
    function closeModal() {
        dispatch('closeModal');
    }
</script>

<div id="modal-result">
    <div id="wrapper">
        {#if result === 'win'}
            <h2 class="head">🎉 You win ! 🎉</h2>
        {:else if result === 'lose'}
            <h2 class="head">😔 You lose... 😔</h2>
        {:else}
            <h2 class="head">Draw</h2>
        {/if}
        <div id="details">
            {#if result !== ""}
            <a
                href={nftLeft.permalink}
                target="_blank"
                rel="noopener noreferrer"
                data-tooltip="helo"
                class="block"
            >
                <span class="crown" style="visibility: {nftLeftPrice > nftRightPrice ? 'visible' : 'hidden'};">👑</span>
                {#if nftLeft.image_url === ""}
                    <img src="/assets/image_not_available.png" alt="not avaiable" />
                {:else}
                    <img src={nftLeft.image_url} alt="" />
                {/if}
                <span class="price">
                    {Number(ethers.utils.formatEther(String(nftLeftPrice)))} ETH
                </span>
            </a>
            <span class="mark">
                {#if nftLeftPrice > nftRightPrice}
                &gt;
                {:else if nftLeftPrice < nftRightPrice}
                &lt;
                {:else}
                &#9651;
                {/if}
            </span>
            <a
                href={nftRight.permalink}
                target="_blank"
                rel="noopener noreferrer"
                class="block"
            >
                <span class="crown" style="visibility: {nftLeftPrice < nftRightPrice ? 'visible' : 'hidden'};">👑</span>
                {#if nftRight.image_url === ""}
                    <img src="/assets/image_not_available.png" alt="not avaiable" />
                {:else}
                    <img src={nftRight.image_url} alt="" />
                {/if}
                <span class="price">
                    {Number(ethers.utils.formatEther(String(nftRightPrice)))} ETH
                </span>
            </a>
            {/if}
        </div>
        <button on:click={clickNext} id="next">
            Next
        </button>
    </div>
</div>

<style>
    #modal-result {
        width: 512px;
       	position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-white);
        border-radius: 8px;
        filter: drop-shadow(0 0 28px rgba(100,100,100,0.6));
        padding: 24px;
        opacity: 0;
        visibility: hidden;
        transition: 0.1s;
    }

    #wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .head {
        margin: 8px 0;
        font-size: 1.8em;
    }

    #details {
        margin: 12px 0 26px 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    #details .block {
        margin: 0 12px;
        padding: 0 0 12px 0;
        width: 100%;
        display: flex;
        background: none;
        border-radius: 8px;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: var(--color-black);
        transition: 0.4s;
    }
    #details .block:hover {
        background: var(--color-lightgrey);
    }
    #details .block .crown {
        margin: 0 0 24px 0;
        line-height: 0.2em;
        font-size: 3.2em;
    }
    #details .block img {
        margin: 14px 0;
        width: 90%;
    }
    #details .block .price {
        font-size: 1.4em;
        font-weight: bold;
    }
    #details .mark {
        margin: 0 18px;
        font-size: 2.6em;
        font-weight: bold;
    }

    #next {
        width: 100%;
        filter: none;
        padding: 8px 0;
        font-size: 1.4em;
        font-weight: bold;
    }

    @media (max-width: 480px) {
        #modal-result {
            width: 100vw;
        }
    }
</style>