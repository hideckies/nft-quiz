<script>
    import { onMount } from 'svelte';
    import { ethers } from 'ethers';
    import ModalResult from '$lib/components/ModalResult.svelte';

    let isLoading = true;

    let nftLeft;
    let nftRight;

    let selected = "";
    let result = "";

    let isOpenModal = false;

    onMount(async () => {
        isLoading = true;

        nftLeft = await getNFT('0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb', 1);
        nftRight = await getNFT('0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb', 2);

        // console.log("Left Price: ", nftLeft.last_sale.total_price);

        // console.log("Right Price: ", nftRight.last_sale.total_price);

        isLoading = false;
    });

    async function getNFT(contractAddress, tokenId) {
        const options = {method: 'GET'};

        try {
            const res = await fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`, options);
            const resJson = await res.json();
            return resJson;
        } catch (err) {
            return err;
        }
    }

    function answer() {
        console.log(selected);

        // Price
        let nftLeftPrice = 0;
        let nftRightPrice = 0;

        if (nftLeft.last_sale) {
            nftLeftPrice = nftLeft.last_sale.total_price;
        }
        if (nftRight.last_sale) {
            nftRightPrice = nftRight.last_sale.total_price;
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
        isOpenModal = true;
    }

    function closeModal() {
        isOpenModal = false;
    }
</script>

<div id="content">
    <div id="wrapper">
        {#if isLoading}
            <p>Loading...</p>
        {:else}
            <div
                on:click={() => selected = "left"}
                class="nft left"
                style="border: {selected === 'left' ? '3px solid var(--color-black)' : 'none'};"
            >
                <img src={nftLeft.image_url} alt="left" />
            </div>
            <span id="vs">X</span>
            <div
                on:click={() => selected = "right"}
                class="nft right"
                style="border: {selected === 'right' ? '3px solid var(--color-black)' : 'none'};"
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
    isOpenModal={isOpenModal}
    result={result}
    nftLeft={nftLeft}
    nftRight={nftRight}
    on:closeModal={closeModal} />

<style>
    #content {
        margin: 24px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #wrapper {
        width: 100%;
        height: 320px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .nft {
        box-sizing: border-box;
        width: 256px;
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
    }

    #vs {
        margin: 0 24px;
        font-size: 2em;
        font-weight: bold;
    }

    #answer {
        font-size: 2.4em;
        font-weight: bold;
    }
</style>