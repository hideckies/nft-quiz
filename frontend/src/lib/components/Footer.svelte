<footer>
    <div class="block">
        <span>Powered by</span>
        <a href="https://opensea.io/" target="_blank" rel="noopener noreferrer" class="opensea">
            <img src="/assets/opensea.png" alt="opensea" />
        </a>
    </div>
    <div class="block">
        <span>Developer:</span>
        <a href="https://twitter.com/hideckies" target="_blank" rel="noopener noreferrer" class="twitter">
            @Hideckies
        </a>
    </div>
</footer>

<style>
    footer {
        margin-top: 72px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .block {
        margin: 0 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .block span {
        margin-right: 6px;
        font-size: 1em;
    }
    .block .opensea img {
        width: 32px;
    }
    .block .twitter {
        font-weight: bold;
    }

    @media (max-width: 480px) {
        footer {
            flex-direction: column;
        }

        .block {
            margin: 8px 0;
        }
    }
</style>