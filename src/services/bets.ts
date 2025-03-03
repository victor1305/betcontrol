import { ObjectId } from 'mongodb';

import { connectToDatabase } from '$lib/db';
import type { Bet } from '@/lib/dbModelTypes';

const db = await connectToDatabase();
const betsCollection = db.collection<Bet>('bets');

export const getBetsByUserId = async (userId: string) => {
  try {
    const bets = await betsCollection.find({ userId: new ObjectId(userId) }).toArray();

    if (!bets) {
      throw new Error('The user has no bets');
    }

    return bets;
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};

export const getBetsByBookieId = async (bookieId: string, userId: string) => {
  try {
    const bets = await betsCollection.find({ bookie: new ObjectId(bookieId), userId: new ObjectId(userId) }).toArray();

    if (!bets) {
      throw new Error('The user has no bets');
    }

    return bets;
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};


export const getBetById = async (betId: string) => {
  try {
    const bets = await betsCollection.find({ _id: new ObjectId(betId) }).toArray();

    if (!bets) {
      throw new Error('Bet not found');
    }

    return bets;
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};

export const createBet = async (data: Bet) => {
  try {
    const result = await betsCollection.insertOne(data);

    if (!result.insertedId) {
      throw new Error('Failed to create bet');
    }

    return result;
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};