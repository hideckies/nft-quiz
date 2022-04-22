<script>
    import { onMount } from 'svelte';
    import ModalResult from '$lib/components/ModalResult.svelte';
    import { nfts } from '$lib/NFTs';
    import { getRandIntRange, getRandKeyFromObj } from '$lib/Utils';
    import { OPENSEA_API_KEY } from '$lib/Env';

    let OpenSeaApiKey;

    if (process.env.NODE_ENV === 'production') {
        OpenSeaApiKey = process.env.OPENSEA_API_KEY;
    } else {
        OpenSeaApiKey = OPENSEA_API_KEY;
    }

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

        // Get random NFTs
        const addressForLeft = getRandKeyFromObj(nfts);
        nftLeft = await getNFT(addressForLeft, nfts[addressForLeft]);
        const addressForRight = getRandKeyFromObj(nfts);
        nftRight = await getNFT(addressForRight, nfts[addressForRight]);

        if (nftLeft === null || nftRight === null) {
            await initNFT();
        }

        isLoading = false;
    }

    async function getNFT(contractAddress, totalSupply) {
        const options = {
            method: 'GET',
            headers: {
                'X-API-KEY': OpenSeaApiKey
            }
        };

        // Random token Id
        const tokenId = getRandIntRange(0, totalSupply);

        const res = await fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`, options)
            .then(response => {
                if (response.status >= 400 && response.status < 600) {
                    return null;
                }
                return response;
            });

        if (res === null) {
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
                    border:  ${selected === 'left' ? '4px solid var(--color-yellow)' : 'none'};
                `}
            >
                {#if nftLeft}
                    {#if nftLeft.image_url === ""}
                        <img src="/assets/image_not_available.png" alt="not avaiable" />
                    {:else}
                        <img src={nftLeft.image_url} alt="" />
                    {/if}
                {/if}
            </div>
            <span id="vs">X</span>
            <div
                on:click={() => selected = "right"}
                class="nft right"
                style={`
                    border: ${selected === 'right' ? '4px solid var(--color-yellow)' : 'none'};
                `}
            >
                {#if nftRight}
                    {#if nftRight.image_url === ""}
                        <img src="/assets/image_not_available.png" alt="not avaiable" />
                    {:else}
                        <img src={nftRight.image_url} alt="" />
                    {/if}
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

<ModalResult
    result={result}
    nftLeft={nftLeft}
    nftLeftPrice={nftLeftPrice}
    nftRight={nftRight}
    nftRightPrice={nftRightPrice}
    on:closeModal={closeModal}
    on:clickNext={clickNext} />

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
        position: relative;
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
        position: absolute;
        object-fit: contain;
        width: 100%;
        height: 100%;
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
    }
</style>