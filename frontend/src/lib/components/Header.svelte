<script>
    import { onMount } from 'svelte';
    import ModalAbout from '$lib/components/ModalAbout.svelte';

    let modalAboutBgElem;
    let modalAboutElem;

    onMount(async () => {
        modalAboutBgElem = document.getElementById("modal-about-bg");
        modalAboutElem = document.getElementById("modal-about");
    });

    function openModalAbout() {
        // Fade in
        modalAboutBgElem.style.display = "block";
        modalAboutElem.style.visibility = "visible";
        modalAboutElem.style.opacity = "1";
    }

    function closeModalAbout() {
        // Fade out
        modalAboutBgElem.style.display = "none";
        modalAboutElem.style.visibility = "hidden";
        modalAboutElem.style.opacity = "0";
    }
</script>

<div id="title">
    <h1>NFT Quiz</h1>
    <div id="icons">
        <img src="/assets/question.png" alt="question" on:click={openModalAbout} class="icon" />
        <a href="https://github.com/hideckies/nft-quiz" target="_blank" rel="noopener noreferrer" class="icon">
            <img src="/assets/github.png" alt="github" />
        </a>
    </div>
</div>

<ModalAbout on:closeModalAbout={closeModalAbout} />

<style>
    #title {
        position: relative;
        width: 100%;
        background: var(--color-yellow);
        border-bottom: 10px solid var(--color-lightyellow);
        padding: 14px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    h1 {
        margin: 0 4px;
        font-size: 1.6em;
        font-weight: bold;
    }

    #icons {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #icons .icon {
        margin: 0 6px;
    }
    #icons img {
        width: 32px;
        cursor: pointer;
    }
</style>