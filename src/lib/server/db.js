import { MONGODB_URI } from '$app/env/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGODB_URI);

export async function getDb() {
	await client.connect();

	return client.db('signum');
}