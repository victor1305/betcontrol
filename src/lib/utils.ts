import type { ObjectId } from 'mongodb';
import type { BetDefault } from './types';

export const arraysAreEqual = (arr1: ObjectId[] | string[], arr2: ObjectId[] | string[]) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, index) => val.toString() === arr2[index].toString());
};

export const getProfit = (bet: BetDefault) => {
  let profit = 0;

  if (bet.event.some((event) => event.status === 'lost') && !bet.systemOptions) {
    profit = -(bet.amount as number);
  }
  if (bet.event.every((event) => event.status === 'won' || event.status === 'void') && !bet.systemOptions) {
    const totalOdds = bet.event
    .filter(event => event.status === 'won')
    .reduce((acc, event) => {
      const oddValue = typeof event.odd === 'string' ? parseFloat(event.odd) : event.odd;
      return acc * (oddValue || 1);
    }, 1);

    profit = totalOdds * (bet.amount as number) - (bet.amount as number);
  } else if (bet.systemOptions && bet.event.filter(event => event.status === 'won').length >= 2) {
    
  }

  return profit;
};