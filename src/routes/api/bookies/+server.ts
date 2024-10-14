import type { Bookie } from '@/lib/dbModelTypes';
import { createBookie, getBookies } from '@/services/bookies';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  try {
    const result = await getBookies();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const result = createBookie(data as Bookie);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
};
