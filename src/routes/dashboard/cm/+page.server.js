import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '#lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = cookies.get('userId');

	if (!userId) {
		redirect(303, '/login');
	}

	const db = await getDb();

	const user = await db.collection('users').findOne({
		_id: new ObjectId(userId)
	});

	if (!user) {
		redirect(303, '/login');
	}

	if (user.role !== 'credit_manager') {
		redirect(303, '/dashboard/lo');
	}

	const applications = await db
		.collection('applications')
		.find({})
		.sort({ createdAt: 1 })
		.toArray();

	return {
		user: {
			name: user.name,
			role: user.role
		},
		applications: applications.map((application) => ({
			id: application._id.toString(),
			firstName: application.firstName,
			lastName: application.lastName,
			loanRequest: application.loanRequest,
			status: application.status
		}))
	};
}