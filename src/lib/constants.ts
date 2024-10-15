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

export const appName = 'BETCONTROL';

export const betSports = [
  'football',
  'basketball',
  'baseball',
  'hockey',
  'soccer',
  'tennis',
  'volleyball',
  'golf',
  'racing',
  'rugby',
  'cycling',
  'badminton',
  'table-tennis',
  'horse-racing',
  'boxing',
  'martial-arts',
  'others'
] as const;
