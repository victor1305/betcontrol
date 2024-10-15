import { ObjectId } from 'mongodb';

import { connectToDatabase } from '$lib/db';

import type { Bookie } from '@/lib/dbModelTypes';

const db = await connectToDatabase();
const bookiesCollection = db.collection<Bookie>('principalbookies');

export const getBookies = async () => {
  const bookies = await bookiesCollection.find({}).toArray();

  return bookies as Bookie[];
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