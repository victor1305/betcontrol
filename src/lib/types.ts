export interface MyLocals {
  pathname: string;
  previousPathname: string;
  sessionToken: string;
  userId: string;
  email: string;
}


interface BetEvent {
  name: string | null,
  sport: string | null,
  status: 'won' | 'lost' | 'pending' | 'canceled',
  isLive: boolean,
  odd: number | null
}

export interface BetDefault {
  bookie: string | null;
  betType: 'simple' | 'multiple' | 'system';
  date: string;
  event: BetEvent[];
  amount: number | null;
  isBonus: boolean;
  tipster: string | null;
  cashout: boolean;
  cashoutPrice: number | null;
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

export type SystemOptionField = keyof Pick<
BetDefault,
| 'trixie'
| 'yankie'
| 'superyankie'
| 'heinz'
| 'superheinz'
| 'goliat'
| 'block'
| 'doubles'
| 'triples'
| 'fours'
| 'fives'
| 'sixes'
| 'sevens'
| 'eights'
>;
