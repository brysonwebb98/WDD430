<script>
	let { data } = $props();

	const dti = (
		(data.application.monthlyDebt / data.application.monthlyIncome) *
		100
	).toFixed(1);
</script>

<h1>Underwriting</h1>

<section>
	<p><strong>Borrower:</strong> {data.application.firstName} {data.application.lastName}</p>
	<p><strong>Loan Request:</strong> ${data.application.loanRequest}</p>
	<p><strong>Purpose:</strong> {data.application.purpose}</p>
	<p><strong>Monthly Income:</strong> ${data.application.monthlyIncome}</p>
	<p><strong>Monthly Debt:</strong> ${data.application.monthlyDebt}</p>
	<p><strong>Credit Score:</strong> {data.application.creditScore}</p>
	<p><strong>Status:</strong> {data.application.status}</p>
	<p><strong>DTI:</strong> {dti}%</p>
</section>

<section>
	<h2>Decision</h2>

	<form class="underwriting" method="POST">
		<button type="submit" name="decision" value="approved">Approve</button>
		<button type="submit" name="decision" value="countered">Counter</button>
		<button type="submit" name="decision" value="denied">Deny</button>
		<button type="submit" name="decision" value="pending">Pending</button>
	</form>
</section>