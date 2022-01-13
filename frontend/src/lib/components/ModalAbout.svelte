<script>
    import { createEventDispatcher } from 'svelte';
	
    const dispatch = createEventDispatcher();

    function closeModalAbout() {
        dispatch('closeModalAbout');
    }
</script>

<div id="modal-about-bg" on:click={closeModalAbout}></div>
<div id="modal-about">
    <div id="wrapper">
        <h2>🤑 Price Guessing Game 🤑</h2>
        <div class="block">
            <p>This is a game that confirms your ability to judge the value of the NFT.</p>
        </div>
        <div class="block">
            <h3>📜 Rules</h3>
            <ol>
                <li>Compare the prices at which the asset last sold.</li>
                <li>The value of asset that have never been sold is regarded as <b>"0 ETH"</b>.</li>
                <li>Currently, due to the <b>OpenSea API</b>, it only supports <b>Ethereum</b> chain. (Polygon etc. are not supported)</li>
            </ol>
        </div>
        <div class="block">
            <h3>📢 Request Your NFT!</h3>
            <p>
                Please contact on the
                <a href="https://github.com/hideckies/nft-quiz" target="_blank" rel="noopener noreferrer">GitHub Issues</a>
                or
                <a href="https://twitter.com/hideckies" target="_blank" rel="noopener noreferrer">Twitter DM</a>
                .
            </p>
        </div>
        <div class="block">
            <h3>❓FAQ</h3>
            <div class="subblock">
                <h4>Q. Why the loading spinner is spinning forever?</h4>
                <p>
                    A. The OpenSea API is rate-limited. So if there is a lot of access within a certain period, the api will temporarily stop working. Please wait a while before trying.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    #modal-about-bg {
        display: none;
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.2);
    }

    #modal-about {
        width: 512px;
        max-height: 70vh;
        overflow-y: auto;
       	position: fixed;
        z-index: 101;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-white);
        border: 8px solid var(--color-gold);
        border-radius: 8px;
        filter: drop-shadow(0 0 28px rgba(100,100,100,0.5));
        padding: 32px;
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

    h2 {
        margin: 8px 0;
        font-size: 1.8em;
    }

    .block {
        width: 100%;
    }
    .block h3 {
        width: 100%;
        font-size: 1.4em;
    }
    
    .subblock h4 {
        margin: 12px 0;
    }
    .subblock p {
        margin: 0;
    }

    @media (max-width: 480px) {
        #modal-about {
            width: 80vw;
        }
    }
</style>