import { fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '#lib/server/db.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const userId = cookies.get('userId');

		if (!userId) {
			redirect(303, '/login');
		}

		const formData = await request.formData();

		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');
		const loanRequest = formData.get('loanRequest');
		const purpose = formData.get('purpose');
		const monthlyIncome = formData.get('monthlyIncome');
		const monthlyDebt = formData.get('monthlyDebt');
		const creditScore = formData.get('creditScore');

		const errors = [];

		if (!firstName) {
			errors.push('First name is required');
		}

		if (!lastName) {
			errors.push('Last name is required');
		}

		if (!loanRequest) {
			errors.push('Loan request is required');
		}

		if (!purpose) {
			errors.push('Purpose is required');
		}

		if (!monthlyIncome) {
			errors.push('Monthly income is required');
		}

		if (monthlyDebt === null || monthlyDebt === '') {
			errors.push('Monthly debt is required');
		}

		if (!creditScore) {
			errors.push('Credit score is required');
		}

		const validPurposes = ['purchase', 'debt_consolidation', 'refinance'];

		if (purpose && !validPurposes.includes(purpose.toString())) {
			errors.push('Please select a valid loan purpose');
		}

		if (loanRequest && Number(loanRequest) <= 0) {
			errors.push('Loan request must be greater than 0');
		}

		if (monthlyIncome && Number(monthlyIncome) <= 0) {
			errors.push('Monthly income must be greater than 0');
		}

		if (monthlyDebt !== null && monthlyDebt !== '' && Number(monthlyDebt) < 0) {
			errors.push('Monthly debt cannot be negative');
		}

		if (
			creditScore &&
			(Number(creditScore) < 300 || Number(creditScore) > 850)
		) {
			errors.push('Credit score must be between 300 and 850');
		}

		if (errors.length > 0) {
			return fail(400, {
				errors,
				values: {
					firstName: firstName?.toString() ?? '',
					lastName: lastName?.toString() ?? '',
					loanRequest: loanRequest?.toString() ?? '',
					purpose: purpose?.toString() ?? '',
					monthlyIncome: monthlyIncome?.toString() ?? '',
					monthlyDebt: monthlyDebt?.toString() ?? '',
					creditScore: creditScore?.toString() ?? ''
				}
			});
		}

		const db = await getDb();

		await db.collection('applications').insertOne({
			firstName,
			lastName,
			loanRequest: Number(loanRequest),
			purpose,
			monthlyIncome: Number(monthlyIncome),
			monthlyDebt: Number(monthlyDebt),
			creditScore: Number(creditScore),
			status: 'pending',
			loanOfficerId: new ObjectId(userId),
			createdAt: new Date()
		});

		redirect(303, '/dashboard/lo');
	}
};