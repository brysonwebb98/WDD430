<script>
	let { data } = $props();
</script>

<h1>Credit Manager Dashboard</h1>

<section>
	<h2>Applications to Review</h2>

	{#if data.applications.length === 0}
		<p>No applications waiting for review.</p>
	{:else}
		{#each data.applications as application}
			<div class="app-queue">
				<p>
					<strong>{application.firstName} {application.lastName}</strong>
				</p>

				<p>Loan Request: ${application.loanRequest}</p>
				<p>Status: {application.status}</p>

				<a href={`/applications/underwriting?id=${application.id}`}>
					Review Application
				</a>
			</div>
		{/each}
	{/if}
</section>