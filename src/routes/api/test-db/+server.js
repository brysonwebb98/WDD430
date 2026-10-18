import { getDb } from '#lib/server/db.js';

export async function GET() {
	const db = await getDb();

	return Response.json({
		message: 'MongoDB connected',
		database: db.databaseName
	});
}