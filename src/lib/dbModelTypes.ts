import { ObjectId } from 'mongodb';

export interface Tipster {
  _id?: ObjectId;
  name: string;
  price?: number;
  isDeleted?: boolean;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id?: ObjectId;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  isVerified: boolean;
  bookiesSelected: ObjectId[];
  updatedAt: Date;
}

interface BetStatus {
  status: 'win' | 'lose' | 'pending';
}

export interface Movement {
  _id?: ObjectId;
  bookie: ObjectId;
  userId: ObjectId;
  amount: number;
  type: 'deposit' | 'withdraw' | 'bonus';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bet {
  _id?: ObjectId;
  name: string;
  bookie: ObjectId;
  userId: ObjectId;
  status: BetStatus;
  tipster?: ObjectId;
  sport: string[];
  isBonus?: boolean;
  amount: number;
  odds: number;
  isContabilized?: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bookie {
  _id?: ObjectId;
  name: string;
  logo: string;
  movements: (Bet | Movement)[];
  updatedAt: Date;
  createdAt: Date;
}
