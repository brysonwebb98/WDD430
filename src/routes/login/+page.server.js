import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '#lib/server/db.js';

export function load({ url }) {
	return {
		signupSuccess: url.searchParams.get('signup') === 'success'
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required'
			});
		}

		const db = await getDb();
		const users = db.collection('users');

		const user = await users.findOne({ email });

		if (!user) {
			return fail(400, {
				error: 'Invalid email or password'
			});
		}

		const passwordMatches = await bcrypt.compare(
			password.toString(),
			user.password
		);

		if (!passwordMatches) {
			return fail(400, {
				error: 'Invalid email or password'
			});
		}

		cookies.set('userId', user._id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax'
		});

		if (user.role === 'credit_manager') {
			redirect(303, '/dashboard/cm');
		}

		redirect(303, '/dashboard/lo');
	}
};