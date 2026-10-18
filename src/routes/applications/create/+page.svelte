<script>
	let { form } = $props();
</script>

<h1>Create Loan Application</h1>
{#if form?.errors}
	<ul>
		{#each form.errors as error}
			<li>{error}</li>
		{/each}
	</ul>
{/if}

<form method="POST">
	<label>
		First Name
		<input name="firstName" type="text" required />
	</label>

	<label>
		Last Name
		<input name="lastName" type="text" required />
	</label>

	<label>
		Loan Request
		<input name="loanRequest" type="number" min="1" required />
	</label>

	<label>
		Purpose of Loan
		<select name="purpose" required>
			<option value="">Select a purpose</option>
			<option value="purchase">Purchase</option>
			<option value="debt_consolidation">Debt Consolidation</option>
			<option value="refinance">Refinance</option>
		</select>
	</label>

	<label>
		Monthly Income
		<input name="monthlyIncome" type="number" min="1" required />
	</label>

	<label>
		Monthly Debt
		<input name="monthlyDebt" type="number" min="0" required />
	</label>

	<label>
		Credit Score
		<input
			name="creditScore"
			type="number"
			min="300"
			max="850"
			required
		/>
	</label>

	<button type="submit">Submit Application</button>
</form>