import { ObjectId } from 'mongodb';
import { error, redirect } from '@sveltejs/kit';
import { getDb } from '#lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {
	const userId = cookies.get('userId');

	if (!userId) {
		redirect(303, '/login');
	}

	const applicationId = url.searchParams.get('id');

	if (!applicationId) {
		error(400, 'Application ID is required');
	}

	const db = await getDb();

	const user = await db.collection('users').findOne({
		_id: new ObjectId(userId)
	});

	if (!user || user.role !== 'credit_manager') {
		redirect(303, '/dashboard/lo');
	}

	const application = await db.collection('applications').findOne({
		_id: new ObjectId(applicationId)
	});

	if (!application) {
		error(404, 'Application not found');
	}

	return {
		application: {
			id: application._id.toString(),
			firstName: application.firstName,
			lastName: application.lastName,
			loanRequest: application.loanRequest,
			purpose: application.purpose,
			monthlyIncome: application.monthlyIncome,
			monthlyDebt: application.monthlyDebt,
			creditScore: application.creditScore,
			status: application.status
		}
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, url, cookies }) => {
		const userId = cookies.get('userId');

		if (!userId) {
			redirect(303, '/login');
		}

		const applicationId = url.searchParams.get('id');

		if (!applicationId) {
			error(400, 'Application ID is required');
		}

		const formData = await request.formData();
		const decision = formData.get('decision');

		const validDecisions = ['approved', 'countered', 'denied', 'pending'];

		if (!validDecisions.includes(decision?.toString())) {
			error(400, 'Invalid decision');
		}

		const db = await getDb();

		const user = await db.collection('users').findOne({
			_id: new ObjectId(userId)
		});

		if (!user || user.role !== 'credit_manager') {
			redirect(303, '/dashboard/lo');
		}

		await db.collection('applications').updateOne(
			{ _id: new ObjectId(applicationId) },
			{
				$set: {
					status: decision
				}
			}
		);

		redirect(303, '/dashboard/cm');
	}
};