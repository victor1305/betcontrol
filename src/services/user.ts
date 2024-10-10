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
