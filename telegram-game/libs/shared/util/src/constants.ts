export const locales = ['ko', 'en', 'zhChs', 'zhCht'] as const;
export type Locale = (typeof locales)[number];

export const adminRoles = ['admin', 'superAdmin', 'manager'] as const;
export type AdminRole = (typeof adminRoles)[number];

export const adminStatuses = ['active', 'inactive'] as const;
export type AdminStatus = (typeof adminStatuses)[number];

export const userRoles = ['root', 'admin', 'user'] as const;
export type UserRole = (typeof userRoles)[number];

export const language = [
  'english',
  'korean',
  'japanese',
  'vietnamese',
  'indonesian',
  'chinese',
  'russian',
] as const;
export type Language = (typeof language)[number];

export const profileStatuses = [
  'prepare',
  'applied',
  'approved',
  'verified',
  'reserved',
  'inactive',
] as const;
export type ProfileStatus = (typeof profileStatuses)[number];

export const verifies = [
  'wallet',
  'password',
  'phone',
  'naver',
  'kakao',
  'email',
] as const;
export type Verify = (typeof verifies)[number];

export const userStatuses = ['active', 'restricted', 'inactive'] as const;
export type UserStatus = (typeof userStatuses)[number];

export const specialReferralStatuses = ['used', 'unused'] as const;
export type SpecialReferralStatus = (typeof specialReferralStatuses)[number];

export const gameStatuses = ['ing', 'close', 'end', 'complete'] as const;
export type GameStatus = (typeof gameStatuses)[number];

export const gameChoice = ['LOW', 'HIGH', 'ODD', 'EVEN'] as const;
export type GameChoice = (typeof gameChoice)[number];

export type FirstGameChoice = 'LOW' | 'HIGH';
export type SecondGameChoice = 'ODD' | 'EVEN';
export type MixGameChoice = [FirstGameChoice, SecondGameChoice];

export const bettingStatuses = ['pending', 'complete'] as const;
export type BettingStatus = (typeof bettingStatuses)[number];

export const withdrawStatuses = ['pending', 'complete'] as const;
export type WithdrawStatus = (typeof withdrawStatuses)[number];

export const depositStatuses = [
  'deposit',
  'withdraw',
  'exchange',
  'root-withdraw',
  'root-deposit',
] as const;
export type DepositStatus = (typeof depositStatuses)[number];

export const referralStatuses = ['normal', 'special'] as const;
export type ReferralStatus = (typeof referralStatuses)[number];

export const specials = [
  'highProfit',
  'zeroWithdrawFee',
  'Referral0.8%',
  'Referral1.2%',
] as const;
export type Special = (typeof specials)[number];
