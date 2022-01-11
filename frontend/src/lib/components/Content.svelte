<script>
    import { onMount } from 'svelte';
    import ModalResult from '$lib/components/ModalResult.svelte';
    import { addresses } from '$lib/Contracts';
    import { getRandIntRange, getRandItemFromArray } from '$lib/Utils';

    let isLoading = true;

    let nftLeft;
    let nftLeftPrice;
    let nftRight;
    let nftRightPrice;

    let selected = "";
    let result = "";

    let modalResultElem;

    onMount(async () => {
        await initNFT();

        // Get Modal element
        modalResultElem = document.getElementById("modal-result");
    });

    async function initNFT() {
        selected = "";
        result = "";

        isLoading = true;

        // Get random contract address
        const addressForLeft = getRandItemFromArray(addresses);
        nftLeft = await getNFT(addressForLeft);
        const addressForRight = getRandItemFromArray(addresses);
        nftRight = await getNFT(addressForRight);

        isLoading = false;
    }

    async function getNFT(contractAddress) {
        const options = {method: 'GET'};

        // try {
        //     // Get collection slug
        //     const resContract = await fetch(`https://api.opensea.io/api/v1/asset_contract/${contractAddress}`, options);
        //     const resContractJson = await resContract.json();
        //     const colSlug = resContractJson.collection.slug;
        //     // Get total supply
        //     const resColStats = await fetch(`https://api.opensea.io/api/v1/collection/${colSlug}/stats`, options);
        //     const resColStatsJson = await resColStats.json();
        //     const totalSupply = resColStatsJson.stats.total_supply;
        //     // Random token Id
        //     const tokenId = getRandIntRange(0, totalSupply);
        //     // Final
        //     const res = await fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`, options);
        //     const resJson = await res.json();
        //     return resJson;
        // } catch (err) {
        //     await initNFT();
        // }

        let colSlug;
        let tokenId;

        try {
            // Get collection slug
            const resContract = await fetch(`https://api.opensea.io/api/v1/asset_contract/${contractAddress}`, options);
            const resContractJson = await resContract.json();
            colSlug = resContractJson.collection.slug;
        } catch (err) {
            await initNFT();
        } finally {
            try {
                // Get total supply
                const resColStats = await fetch(`https://api.opensea.io/api/v1/collection/${colSlug}/stats`, options);
                const resColStatsJson = await resColStats.json();
                const totalSupply = resColStatsJson.stats.total_supply;
                // Random token Id
                tokenId = getRandIntRange(0, totalSupply);
            } catch (err) {
                await initNFT();
            } finally {
                try {
                    // Final
                    const res = await fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`, options);
                    const resJson = await res.json();
                    return resJson;
                } catch (err) {
                    await initNFT();
                }
            }
        }
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
    }

    function closeModal() {
        // Fade out
        modalResultElem.style.visibility = "hidden";
        modalResultElem.style.opacity = "0";
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
                <img src={nftLeft.image_url} alt="left" />
            </div>
            <span id="vs">X</span>
            <div
                on:click={() => selected = "right"}
                class="nft right"
                style={`
                    background: ${selected === 'right' ? 'var(--color-yellow)' : 'var(--color-white)'};
                `}
            >
                <img src={nftRight.image_url} alt="right" />
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
    }
    .nft:hover {
        filter: drop-shadow(0 0 12px rgba(150,150,150,0.7));
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