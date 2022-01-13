<script>
    import Header from '$lib/components/Header.svelte';
    import Content from '$lib/components/Content.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>NFT Quiz - A Price Guessing Game</title>
    <meta name='description' content='Which is expensive? Make sure the NFT is valuable to you. This is a game that confirms your ability to judge the value of the NFT.'>

    <!-- Socials -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@hideckies" />
    <meta name="twitter:title" content="NFT Quiz" />
    <meta name="twitter:image" content="https://nft-quiz.hdks.org/assets/og_image.png" />
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://nft-quiz.hdks.org" />
    <meta property="og:title" content="NFT Quiz" />
    <meta property="og:description" content="Which is expensive? Make sure the NFT is valuable to you. This is a game that confirms your ability to judge the value of the NFT." />
    <meta property="og:image" content="https://nft-quiz.hdks.org/assets/og_image.png" />
</svelte:head>

<div id="home">
    <Header />
    <Content />
    <Footer />
</div>