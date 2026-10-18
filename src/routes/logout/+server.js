import { redirect } from '@sveltejs/kit';

export function POST({ cookies }) {
	cookies.delete('userId', {
		path: '/'
	});

	redirect(303, '/login');
}