import { Markup } from 'telegraf';
import { ButtonPackType } from './languagePack/type';
import { buttonPack } from './languagePack/button';

export class Keyboard {
  pack: ButtonPackType;
  constructor(language: string) {
    this.pack = buttonPack[language];
  }

  languageMenu = () =>
    Markup.keyboard([
      ['🇺🇸 English', '🇰🇷 한국어'],
      ['🇮🇩 Indonesia', '🇨🇳 中文'],
      ['🇯🇵 日本語', '🇷🇺 Русский'],
      ['🇻🇳 Tiếng Việt', this.pack['back']],
    ]).resize(true);

  mainMenu = () =>
    Markup.keyboard([
      [this.pack['mainMenu'], this.pack['referral']],
      [this.pack['deposit'], this.pack['withdraw']],
      [this.pack['help'], this.pack['language']],
      ['1', '2', '3', '4', '5'],
      ['10', '20', '30', '40'],
    ]).resize(true);

  helpMenu = () =>
    Markup.keyboard([
      [this.pack['helpMenu1']],
      [this.pack['helpMenu2']],
      [this.pack['helpMenu3']],
      [this.pack['helpMenu4']],
      [this.pack['back']],
    ]).resize(true);

  withdrawMenu = () =>
    Markup.keyboard([
      [this.pack['setAddress']],
      [this.pack['withdrawApply'], this.pack['back']],
    ]).resize(true);

  depositMenu = () =>
    Markup.keyboard([[this.pack['depositCheck'], this.pack['back']]]).resize(
      true
    );

  backMenu = () => Markup.keyboard([[this.pack['back']]]).resize(true);

  referralMenu = () =>
    Markup.keyboard([
      [this.pack['specielReferral'], this.pack['levelUp']],
      [this.pack['exchange'], this.pack['back']],
    ]).resize(true);

  gotoGameMenu = (url: string, referral = false) =>
    Markup.inlineKeyboard([
      [{ text: this.pack['goChannel'], url: url }],
      ...(referral
        ? [[{ text: this.pack['referralView'], callback_data: 'XLSX' }]]
        : [[]]),
    ]);

  adminMenu = () =>
    Markup.keyboard([
      ['User', 'GameHistory'],
      ['BankBook', 'Referral'],
      ['Generate Referral', 'Main Wallet'],
      ['Withdraw', 'Deposit', 'Main'],
    ]).resize(true);

  generateReferralMenu = () =>
    Markup.keyboard([
      [this.pack['lev2'], this.pack['lev3'], this.pack['lev4']],
      [this.pack['highProfit'], this.pack['zeroFee']],
      [this.pack['back']],
    ]).resize(true);
}
