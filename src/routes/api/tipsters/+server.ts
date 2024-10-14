import type { RequestHandler } from '@sveltejs/kit';

import { createTipster, getTipsters, removeTipster } from '@/services/tipsters';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = async ({ url }) => {
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return new Response('Invalid userId', { status: 400 });
  }

  try {
    const result = await getTipsters(userId);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 400 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const tipsterData = await request.json();
    tipsterData.userId = new ObjectId(tipsterData.userId as string);
    tipsterData.createdAt = new Date();
    tipsterData.updatedAt = new Date();
    const result = await createTipster(tipsterData);
    return new Response(JSON.stringify({ success: true, result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ url }) => {
  const tipsterId = url.searchParams.get('tipsterId');
  if (!tipsterId) {
    return new Response('Invalid tipsterId', { status: 400 });
  }

  try {
    await removeTipster(tipsterId);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
