import { type RequestHandler } from '@sveltejs/kit';

import { ObjectId } from 'mongodb';

import { verifyUser } from '@/services/auth';
import { getUserData, updateUserData } from '@/services/user';

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

export const PUT: RequestHandler = async ({ url, request }) => {
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

    const formData = await request.json();
    formData.updatedAt = new Date();
    if (formData.bookiesSelected) {
      formData.bookiesSelected = formData.bookiesSelected.map(
        (bookieId: string) => new ObjectId(bookieId)
      );
    }
    const user = await updateUserData(userId, formData);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 400 });
  }
};
