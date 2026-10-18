<script>
	let { data } = $props();
</script>

<h1>Loan Officer Dashboard</h1>

<a href="/applications/create">Create New Application</a>

<section>
	<h2>My Applications</h2>

	{#if data.applications.length === 0}
		<p>No applications yet.</p>
	{:else}
		{#each data.applications as application}
			<div class="app-queue">
				<p>
					<strong>{application.firstName} {application.lastName}</strong>
				</p>

				<p>Loan Request: ${application.loanRequest}</p>
				<p>Purpose: {application.purpose}</p>
				<p>Status: {application.status}</p>
			</div>
		{/each}
	{/if}
</section>