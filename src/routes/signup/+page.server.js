import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '#lib/server/db.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		if (!name || !email || !password) {
			return fail(400, {
				error: 'All fields are required'
			});
		}

		const db = await getDb();
		const users = db.collection('users');

		const existingUser = await users.findOne({ email });

		if (existingUser) {
			return fail(400, {
				error: 'A user with that email already exists'
			});
		}

		const hashedPassword = await bcrypt.hash(password.toString(), 10);

		await users.insertOne({
			name,
			email,
			password: hashedPassword,
			role: 'loan_officer',
			createdAt: new Date()
		});

		redirect(303, '/login?signup=success');
	}
};