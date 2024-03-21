import { Markup } from 'telegraf';

export const languageMenu = Markup.keyboard([[]]);

export const MainMenu = Markup.keyboard([
  ['👤 Main Menu', '🫂 Referral'],
  ['📥 Deposit', '📤 Withdraw'],
  ['1', '2', '3', '4', '5'],
  ['10', '20', '30', '40'],
  ['❓ Help'],
]).resize(true);

export const HelpMenu = Markup.keyboard([
  ['1. How to play'],
  ['2. How to make a deposit'],
  ['3. How to withdraw'],
  ['4. How to earn commision'],
  ['< Back'],
]).resize(true);

export const WithdrawMenu = Markup.keyboard([
  ['⚙️ Set Withdraw Address'],
  ['➡️ Withdraw', '< Back'],
]).resize(true);

export const DepositMenu = Markup.keyboard([
  ['➕ Deposit Check', '< Back'],
]).resize(true);

export const BackMenu = Markup.keyboard([['< Back']]).resize(true);

export const SignupMenu = Markup.keyboard([
  ['Normal Referral', 'Special Referral'],
]).resize(true);

export const ReferralMenu = Markup.keyboard([
  ['✍️ Input Special Referral', '🆙 Level Up'],
  ['➡️ Exchange', '< Back'],
]).resize(true);

export const GotoGameMenu = (url: string, referral = false) =>
  Markup.inlineKeyboard([
    [{ text: 'Go to Game Channel', url: url }],
    ...(referral
      ? [[{ text: 'Referral Overview(xlsx)', callback_data: 'XLSX' }]]
      : [[]]),
  ]);

export const AdminMenu = Markup.keyboard([
  ['User', 'GameHistory'],
  ['BankBook', 'Referral'],
  ['Generate Referral', 'Main Wallet'],
  ['Ban User', 'UnBan User', 'Give Admin'],
  ['Withdraw', 'Deposit', 'Main'],
]).resize(true);

export const GenerateReferralMenu = Markup.keyboard([
  ['lv2', 'lv3'],
  ['Referral0.8%', 'Referral1.2%'],
  ['< Back'],
]).resize(true);
