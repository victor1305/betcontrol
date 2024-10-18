export interface MyLocals {
  pathname: string;
  previousPathname: string;
  sessionToken: string;
  userId: string;
  email: string;
}


export interface BetDefault {
  bet: string | null,
  bookie: string | null,
  odd: string | null,
  date: string,
  amount: string | null,
  sport: string | null,
  isBonus: boolean,
  status: 'won' | 'lost' | 'pending' | 'canceled',
  tipster: string | null,
  isLive: boolean,
  cashout: boolean,
  cashoutPrice: string | null
}
