import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';
import { getDb } from '#lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = cookies.get('userId');

	if (!userId) {
		redirect(303, '/login');
	}

	const db = await getDb();

	const applications = await db
		.collection('applications')
		.find({
			loanOfficerId: new ObjectId(userId)
		})
		.sort({ createdAt: -1 })
		.toArray();

	return {
		applications: applications.map((application) => ({
			id: application._id.toString(),
			firstName: application.firstName,
			lastName: application.lastName,
			loanRequest: application.loanRequest,
			purpose: application.purpose,
			status: application.status
		}))
	};
}