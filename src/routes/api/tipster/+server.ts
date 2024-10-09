import type { RequestHandler } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/db';
import type { Tipster } from '$lib/dbModelTypes';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const db = await connectToDatabase();
    const data = await request.json();

    const result = await db.collection<Tipster>('tipsters').insertOne(data);
    return new Response(JSON.stringify({ success: true, result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};