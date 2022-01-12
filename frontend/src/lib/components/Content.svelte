<script>
    import { onMount } from 'svelte';
    import ModalResult from '$lib/components/ModalResult.svelte';
    import { contracts } from '$lib/Contracts';
    import { getRandIntRange, getRandItemFromArray, getRandKeyFromObj } from '$lib/Utils';

    let startConfetti;
    let stopConfetti;

    let isLoading = true;

    let nftLeft;
    let nftLeftPrice = 0;
    let nftRight;
    let nftRightPrice = 0;

    let selected = "";
    let result = "";

    let modalResultElem;

    onMount(async () => {
        // Dynamic import
        startConfetti = (await import('$lib/Confetti')).startConfetti;
        stopConfetti = (await import('$lib/Confetti')).stopConfetti;

        await initNFT();

        // Get Modal element
        modalResultElem = document.getElementById("modal-result");
    });

    async function initNFT() {
        // Reset states
        selected = "";
        result = "";

        isLoading = true;

        // Get random contracts
        const addressForLeft = getRandKeyFromObj(contracts);
        nftLeft = await getNFT(addressForLeft, contracts[addressForLeft]);
        const addressForRight = getRandKeyFromObj(contracts);
        nftRight = await getNFT(addressForRight, contracts[addressForRight]);

        if (nftLeft == null || nftRight == null) {
            initNFT();
        }

        isLoading = false;
    }

    async function getNFT(contractAddress, totalSupply) {
        const options = {method: 'GET'};

        // Random token Id
        const tokenId = getRandIntRange(0, totalSupply);

        const res = await fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`, options)
            .then(response => {
                if (response.status >= 400 && response.status < 600) {
                    initNFT();
                }
                return response;
            });

        if (res == null) {
            return null;
        }

        const resJson = await res.json();
        return resJson;
    }

    function answer() {
        // Price
        if (nftLeft.last_sale) {
            nftLeftPrice = nftLeft.last_sale.total_price;
        } else {
            nftLeftPrice = 0;
        }
        if (nftRight.last_sale) {
            nftRightPrice = nftRight.last_sale.total_price;
        } else {
            nftRightPrice = 0;
        }

        nftLeftPrice = Number(nftLeftPrice);
        nftRightPrice = Number(nftRightPrice);

        // Compare
        if (nftLeftPrice > nftRightPrice) {
            if (selected === 'left') result = "win";
            if (selected === 'right') result = "lose";
        }
        if (nftLeftPrice < nftRightPrice) {
            if (selected === 'left') result = "lose";
            if (selected === 'right') result = "win";
        }
        if (nftLeftPrice === nftRightPrice) {
            result = "draw";
        }

        openModal();
    }

    function openModal() {
        // Fade in
        modalResultElem.style.visibility = "visible";
        modalResultElem.style.opacity = "1";

        // Confetti if win
        if (result === 'win') {
            startConfetti();
        }
    }

    function closeModal() {
        // Fade out
        modalResultElem.style.visibility = "hidden";
        modalResultElem.style.opacity = "0";

        // Stop confetti
        stopConfetti();
    }

    async function clickNext() {
        await initNFT();
    }
</script>

<div id="content">
    <h2 id="head">Which is expensive?</h2>
    <div id="wrapper">
        {#if isLoading}
            <img src="/assets/loading.gif" alt="loading" id="loading" />
        {:else}
            <div
                on:click={() => selected = "left"}
                class="nft left"
                style={`
                    background: ${selected === 'left' ? 'var(--color-yellow)' : 'var(--color-white)'};
                `}
            >
                {#if nftLeft}
                <img src={nftLeft.image_url} alt="left" />
                {/if}
            </div>
            <span id="vs">X</span>
            <div
                on:click={() => selected = "right"}
                class="nft right"
                style={`
                    background: ${selected === 'right' ? 'var(--color-yellow)' : 'var(--color-white)'};
                `}
            >
                {#if nftRight}
                <img src={nftRight.image_url} alt="right" />
                {/if}
            </div>
        {/if}
    </div>
    <button
        disabled={selected === '' ? true : false}
        on:click={answer}
        id="answer"
    >
        Answer
    </button>
</div>

{#if nftLeft && nftRight}
<ModalResult
    result={result}
    nftLeft={nftLeft}
    nftLeftPrice={nftLeftPrice}
    nftRight={nftRight}
    nftRightPrice={nftRightPrice}
    on:closeModal={closeModal}
    on:clickNext={clickNext} />
{/if}

<style>
    #content {
        margin: 42px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #head {
        margin: 8px 0;
        font-size: 1.8em;
        font-weight: bold;
    }

    #wrapper {
        width: 100%;
        height: 320px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    #loading {
        width: 92px;
    }

    .nft {
        box-sizing: border-box;
        width: 256px;
        height: 256px;
        background: var(--color-white);
        border-radius: 6px;
        filter: drop-shadow(0 0 12px rgba(150,150,150,0.5));
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.2s;
    }
    .nft:hover {
        filter: drop-shadow(0 0 12px rgba(150,150,150,0.8));
    }
    .nft img {
        width: 90%;
        border-radius: 6px;
    }

    #vs {
        margin: 0 24px;
        font-size: 2em;
        font-weight: bold;
    }

    #answer {
        margin: 32px 0 0 0;
        font-size: 2.4em;
        font-weight: bold;
    }
</style>