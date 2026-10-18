<script>
	let { form } = $props();
</script>

<h1>Sign Up</h1>

{#if form?.error}
	<p>{form.error}</p>
{/if}

<form method="POST">
	<label>
		Name
		<input name="name" type="text" />
	</label>

	<label>
		Email
		<input name="email" type="email" />
	</label>

	<label>
		Password
		<input name="password" type="password" />
	</label>

	<button type="submit">Create Account</button>
</form>