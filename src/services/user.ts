import { ObjectId } from 'mongodb';

import { connectToDatabase } from '$lib/db';

import type { User } from '@/lib/dbModelTypes';

const db = await connectToDatabase();
const usersCollection = db.collection<User>('users');

export const getUserData = async (userId: string) => {
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateUserData = async (userId: string, data: Partial<User>) => {
  try {
    const result = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: data });

    if (result.modifiedCount === 0) {
      return new Response('No fields were updated', { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, message: 'User updated successfully' }), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
