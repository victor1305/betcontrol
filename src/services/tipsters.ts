import { ObjectId } from 'mongodb';

import { connectToDatabase } from '$lib/db';

import type { Bet, Tipster } from '@/lib/dbModelTypes';

const db = await connectToDatabase();
const tipstersCollection = db.collection<Tipster>('tipsters');
const betsCollection = db.collection<Bet>('bets');

export const getTipsters = async (userId: string) => {
  const tipsters = await tipstersCollection
    .find({ userId: new ObjectId(userId), isDeleted: { $ne: true } })
    .toArray();

  return tipsters as Tipster[];
};

export const updateTipster = async (tipsterId: string, data: Partial<Tipster>) => {
  const result = await tipstersCollection.updateOne(
    { _id: new ObjectId(tipsterId) },
    { $set: data }
  );

  if (result.modifiedCount === 0) {
    throw new Error('No fields were updated');
  }
};

export const createTipster = async (data: Tipster) => {
  const checkIfTipsterExists = await tipstersCollection.findOne({ name: data.name });

  if (checkIfTipsterExists && checkIfTipsterExists.isDeleted) {
    await updateTipster(checkIfTipsterExists._id.toString(), { isDeleted: false });
    return checkIfTipsterExists._id;
  } else if (checkIfTipsterExists && !checkIfTipsterExists.isDeleted) {
    throw new Error('Tipster already exists');
  } else {
    const result = await tipstersCollection.insertOne(data);

    if (!result.insertedId) {
      throw new Error('Failed to create tipster');
    }
    return result.insertedId;
  }
};

export const removeTipster = async (tipsterId: string) => {
  const tipsterHasBets = await betsCollection.countDocuments({
    tipsterId: new ObjectId(tipsterId)
  });
  if (tipsterHasBets) {
    await updateTipster(tipsterId, { isDeleted: true });
  } else {
    await tipstersCollection.deleteOne({ _id: new ObjectId(tipsterId) });
  }
};
