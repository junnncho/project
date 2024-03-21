import { Markup } from 'telegraf';

export const BettingMenu = Markup.inlineKeyboard([
  [
    { text: '🔵 LOW', callback_data: 'LOW' },
    { text: '🔴 HIGH', callback_data: 'HIGH' },
  ],
  [
    { text: '🟡 ODD', callback_data: 'ODD' },
    { text: '🟢 EVEN', callback_data: 'EVEN' },
  ],
]);

export const GotoDashboardMenu = (url: string) =>
  Markup.inlineKeyboard([[{ text: 'Go to Dashboard 👉', url: url }]]);
