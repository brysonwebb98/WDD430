<script>
	import '#lib/styles.css';
	import favicon from '#lib/assets/favicon.svg';
	import Navbar from '#lib/Navbar.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar loggedIn={data.loggedIn} role={data.role} />

<main>
	{@render children()}
</main>

<footer>
	<p>Signum Loan Platform</p>
</footer>