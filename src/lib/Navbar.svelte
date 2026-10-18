<script>
	let { loggedIn, role } = $props();
</script>

<nav>
	<a href="/">Home</a>

	{#if loggedIn}
		{#if role === 'credit_manager'}
			<a href="/dashboard/cm">Dashboard</a>
		{:else}
			<a href="/dashboard/lo">Dashboard</a>
		{/if}

		<form method="POST" action="/logout">
			<button type="submit">Log Out</button>
		</form>
	{:else}
		<a href="/login">Login</a>
		<a href="/signup">Sign Up</a>
	{/if}
</nav>