import { Markup } from 'telegraf';
import { ReplyKeyboardMarkup } from 'typegram';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { cnst } from '@shared/util';

export interface MessagePackType {
  restrict: string;
  amountError: string;
  select: string;
  selectLanguage: string;
  checkDeposit: string;
  anyDeposit: string;
  noExchange: string;
  enterReferral: string;
  processing: string;
  signUp: string;
  registerSpecial: string;
  anyReferral: string;
  enterAddress: string;
  cancelAddress: string;
  cancelWithdraw: string;
  completeAddress: string;
  completeLanguage: string;
  retry: string;
  help: string;
  invalidAddress: string;
  completeDeposit: (amount: number) => string;
  completeWithdraw: (amount: number) => string;
  completeExchange: (amount: number) => string;
  completeLevelUp: (spend: number, level: number) => string;
  mainWallet: (balance: number, address: string) => string;
  setAmount: (amount: number) => string;
  dashboard: (user: User) => string;
  deposit: (user: User) => string;
  depositRoot: (user: User) => string;
  withdraw: (user: User) => string;
  withdrawConfirm: (user: User) => string;
  referral: (user: User) => string;
  bettingComplete: (betting: Betting) => string;
  gameResult: (
    betting: Betting,
    user: User,
    result: cnst.GameChoice[],
    profit: number
  ) => string;
  help1: string;
  help2: string;
  help3: string;
  help4: string;
  levelMaxError: string;
  notEnoughSol: string;
  underMinimumSol: string;
  notRegisterdAddress: string;
  wrong: string;
}

export interface KeyboardType {
  languageMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  mainMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  helpMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  withdrawMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  depositMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  backMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  referralMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  // gotoGameMenu: (
  //   url: string,
  //   referral?: boolean
  // ) => Markup.Markup<ReplyKeyboardMarkup>;
  adminMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
  generateReferralMenu: () => Markup.Markup<ReplyKeyboardMarkup>;
}

export interface ButtonPackType {
  mainMenu: string;
  referral: string;
  deposit: string;
  withdraw: string;
  help: string;
  language: string;
  helpMenu1: string;
  helpMenu2: string;
  helpMenu3: string;
  helpMenu4: string;
  setAddress: string;
  withdrawApply: string;
  back: string;
  depositCheck: string;
  specielReferral: string;
  levelUp: string;
  exchange: string;
  goChannel: string;
  referralView: string;
  lev2: string;
  lev3: string;
  lev4: string;
  highProfit: string;
  zeroFee: string;
}

export interface ButtonSetType {
  mainMenu: string[];
  referral: string[];
  deposit: string[];
  withdraw: string[];
  help: string[];
  language: string[];
  helpMenu1: string[];
  helpMenu2: string[];
  helpMenu3: string[];
  helpMenu4: string[];
  setAddress: string[];
  withdrawApply: string[];
  back: string[];
  depositCheck: string[];
  specielReferral: string[];
  levelUp: string[];
  exchange: string[];
  goChannel: string[];
  referralView: string[];
  lev2: string[];
  lev3: string[];
  lev4: string[];
  highProfit: string[];
  zeroFee: string[];
}

export interface LanguagePackType {
  english: MessagePackType;
  korean: MessagePackType;
  indonesian: MessagePackType;
  chinese: MessagePackType;
  japanese: MessagePackType;
  russian: MessagePackType;
  vietnamese: MessagePackType;
}
