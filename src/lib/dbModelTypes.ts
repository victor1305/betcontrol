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
  name?: string;
  lastname?: string;
  role: string;
  password: string;
  createdAt: Date;
  isVerified: boolean;
  bookiesSelected: ObjectId[];
  updatedAt: Date;
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

export interface BetEvent {
  name: string | null,
  sport: string | null,
  status: 'won' | 'lost' | 'pending' | 'void',
  isLive: boolean,
  odd: number | null
}

export interface Bet {
  _id?: ObjectId;
  name: string;
  bookie: ObjectId;
  userId: ObjectId;
  event: BetEvent[];
  amount: number | null;
  isBonus: boolean;
  tipster: string | null;
  cashout: boolean;
  cashoutPrice: number | null;
  isContabilized?: boolean;
  date: Date;
  systemOptions: boolean;
  profit: number | null;
  totalPayed: number | null;
  totalWon: number | null;
  createdAt: Date;
  updatedAt: Date;
  // Apuestas específicas por sistemas
  trixie: number | null;
  yankie: number | null;
  superyankie: number | null;
  heinz: number | null;
  superheinz: number | null;
  goliat: number | null;
  block: number | null;
  // Opciones de combinaciones
  doubles: number | null;
  triples: number | null;
  fours: number | null;
  fives: number | null;
  sixes: number | null;
  sevens: number | null;
  eights: number | null;
}

export interface Bookie {
  _id?: ObjectId;
  name: string;
  logo: string;
  movements: (Bet | Movement)[];
  updatedAt: Date;
  createdAt: Date;
}

