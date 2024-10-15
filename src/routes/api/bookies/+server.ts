import { type RequestHandler } from '@sveltejs/kit';

import type { Bookie } from '$lib/dbModelTypes';

import { verifyUser } from '@/services/auth';
import { createBookie, getBookies } from '@/services/bookies';

export const GET: RequestHandler = async () => {
  try {
    const result = await getBookies();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, url }) => {
  const userId = url.searchParams.get('userId');
  if (!userId) {
    return new Response('Invalid userId', { status: 400 });
  }
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    verifyUser(token, userId);

    const data = await request.json();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const result = createBookie(data as Bookie);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
};
