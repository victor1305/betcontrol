import { ObjectId } from 'mongodb';

import { connectToDatabase } from '$lib/db';

import type { Bookie, User } from '@/lib/dbModelTypes';

const db = await connectToDatabase();
const bookiesCollection = db.collection<Bookie>('principalbookies');
const usersCollection = db.collection<User>('users');

export const getBookies = async () => {
  const bookies = await bookiesCollection.find({}).toArray();

  return bookies as Bookie[];
};

export const getUserBookiesSelected = async (userId: string) => {
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const bookies = await bookiesCollection
    .find({ _id: { $in: user.bookiesSelected } })
    .sort({ name: 1 })
    .toArray();

  return {
    user,
    bookies
  };
};

export const getBookie = async (bookieId: string) => {
  const bookie = await bookiesCollection.findOne({ _id: new ObjectId(bookieId) });

  if (!bookie) {
    throw new Error('Bookie not found');
  }

  return bookie;
};

export const createBookie = async (bookie: Bookie) => {
  const result = await bookiesCollection.insertOne(bookie);

  if (result.insertedId) {
    return { success: true, bookieId: result.insertedId };
  } else {
    throw new Error('Failed to create bookie');
  }
};
