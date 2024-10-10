import { type RequestHandler } from '@sveltejs/kit';

import { getUserData } from '@/services/user';

export const GET: RequestHandler = async ({ url }) => {
  const userId = url.searchParams.get('userId');
  if (!userId) {
    return new Response('Invalid userId', { status: 400 });
  }

  try {
    const user = await getUserData(userId);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 400 });
  }
};
