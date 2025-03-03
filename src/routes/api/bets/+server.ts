import { type RequestHandler } from '@sveltejs/kit';

import { ObjectId } from 'mongodb';

import { verifyUser } from '@/services/auth';
import { createBet, getBetsByUserId, getBetsByBookieId, getBetById } from '@/services/bets';

export const GET: RequestHandler = async ({ url }) => {
  const userId = url.searchParams.get('userId');
  const getType = url.searchParams.get('type');
  const betId = url.searchParams.get('betId') as string;
  const bookieId = url.searchParams.get('bookieId') as string;

  if (!userId) {
    return new Response('Invalid userId', { status: 400 });
  }

  try {
    if (getType === 'user') {
      const bets = await getBetsByUserId(userId);
      return new Response(JSON.stringify(bets), { status: 200 });
    } else if (getType === 'bookie') {
      const bets = await getBetsByBookieId(bookieId, userId);
      return new Response(JSON.stringify(bets), { status: 200 });
    } else {
      const bets = await getBetById(betId);
      return new Response(JSON.stringify(bets), { status: 200 });
    }
  } catch (error) {
    return new Response(error as string, { status: 400 });
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

    const formData = await request.json();
    formData.userId = new ObjectId(formData.userId as string);
    formData.bookie = new ObjectId(formData.bookie as string);
    formData.createdAt = new Date();
    formData.updatedAt = new Date();

    const bet = await createBet(formData);
    return new Response(JSON.stringify(bet), { status: 201 });
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
};
