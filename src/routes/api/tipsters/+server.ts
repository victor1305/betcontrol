import type { RequestHandler } from '@sveltejs/kit';

import { createTipster, getTipsters, removeTipster, updateTipster } from '@/services/tipsters';
import { ObjectId } from 'mongodb';
import { verifyUser } from '@/services/auth';

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

export const PUT: RequestHandler = async ({ request, url }) => {
  const userId = url.searchParams.get('userId');
  const tipsterId = url.searchParams.get('tipsterId') as string;
  if (!userId || !tipsterId) {
    return new Response('Invalid userId or tipsterId', { status: 400 });
  }

  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    verifyUser(token, userId);
    const tipsterData = await request.json();
    tipsterData.updatedAt = new Date();
    tipsterData.userId = new ObjectId(tipsterData.userId as string);
    const result = await updateTipster(tipsterId, tipsterData);
    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ url, request }) => {
  const tipsterId = url.searchParams.get('tipsterId');
  const userId = url.searchParams.get('userId');

  if (!tipsterId || !userId) {
    return new Response('Invalid tipsterId', { status: 400 });
  }

  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    verifyUser(token, userId);

    await removeTipster(tipsterId);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
