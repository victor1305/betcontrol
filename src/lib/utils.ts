import type { ObjectId } from 'mongodb';

export const arraysAreEqual = (arr1: ObjectId[] | string[], arr2: ObjectId[] | string[]) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, index) => val.toString() === arr2[index].toString());
};