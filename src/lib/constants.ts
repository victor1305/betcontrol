import type { BetDefault } from './types';

export const paths = {
  home: '/',
  login: '/login',
  profile: '/profile',
  profileConfig: '/profile/configuration',
  confirmEmail: '/confirm-email',
  verifyEmail: '/verify-email',
  bookies: '/bookies',
  tipsters: '/tipsters',
  bets: '/bets'
} as const;

export const appName = 'BETCONTROL' as const;

export const betSports = [
  'football',
  'horse-racing',
  'tennis',
  'basketball',
  'racing',
  'baseball',
  'hockey',
  'volleyball',
  'golf',
  'rugby',
  'cycling',
  'badminton',
  'table-tennis',
  'boxing',
  'martial-arts',
  'others'
] as string[];

export const menuItems = [
  { icon: 'ph:house-line', text: 'menu-dashboard', path: paths.home },
  { icon: 'ph:money-wavy', text: 'menu-bets', path: paths.bets },
  { icon: 'ph:bank', text: 'menu-bookies', path: paths.bookies },
  { icon: 'icon-park-outline:user-business', text: 'menu-tipsters', path: paths.tipsters }
];

export const betDefault = {
  bookie: null,
  date: new Date().toISOString().split('T')[0],
  cashout: false,
  cashoutPrice: null,
  tipster: null,
  isBonus: false,
  amount: null,
  event: [
    {
      name: null,
      sport: null,
      status: 'pending',
      isLive: false,
      odd: null
    }
  ]
} as BetDefault;

export const statusList = ['pending', 'won', 'lost', 'void'] as string[];
