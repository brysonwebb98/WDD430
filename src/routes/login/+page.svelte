<script>
	let { form, data } = $props();
</script>

<h1>Login</h1>

{#if data?.signupSuccess}
	<p class="success-message">
		Account created successfully. Please log in.
	</p>
{/if}

{#if form?.error}
	<p class="error-message">
		{form.error}
	</p>
{/if}

<form method="POST">
	<label>
		Email
		<input name="email" type="email" required />
	</label>

	<label>
		Password
		<input name="password" type="password" required />
	</label>

	<button type="submit">Log In</button>
</form>