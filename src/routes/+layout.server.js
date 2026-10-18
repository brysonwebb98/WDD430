import { ObjectId } from 'mongodb';
import { getDb } from '#lib/server/db.js';

export async function load({ cookies }) {
	const userId = cookies.get('userId');

	if (!userId) {
		return {
			loggedIn: false,
			role: null
		};
	}

	const db = await getDb();

	const user = await db.collection('users').findOne({
		_id: new ObjectId(userId)
	});

	return {
		loggedIn: !!user,
		role: user?.role ?? null
	};
}