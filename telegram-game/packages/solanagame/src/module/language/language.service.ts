import { Inject, Injectable } from '@nestjs/common';
import { cnst, Utils } from '@shared/util';
import { ParseMode } from 'typegram';
import { TempTelegramCTX } from '../realTime/realTime.update';
import { UserService } from '../user/user.service';
import { Keyboard } from './language.front';
import { messagePack } from './languagePack/message';
import {
  ButtonPackType,
  ButtonSetType,
  KeyboardType,
  LanguagePackType,
  MessagePackType,
} from './languagePack/type';

@Injectable()
export class LanguageService {
  private readonly messagePack: LanguagePackType;
  constructor(private readonly userService: UserService) {
    this.messagePack = messagePack;
  }

  translateMessage(
    language: cnst.Language,
    choice: keyof MessagePackType,
    ...args: any[]
  ) {
    const temp = this.messagePack[language][choice];
    const message = temp
      ? typeof temp === 'function'
        ? // eslint-disable-next-line prefer-spread
          temp.apply(null, args)
        : temp
      : choice;
    return message;
  }

  sendMessage(
    ctx: TempTelegramCTX,
    choice: keyof MessagePackType,
    ...args: any[]
  ): string {
    const language = ctx.session.language;
    const temp = this.messagePack[language][choice];
    const message = temp
      ? typeof temp === 'function'
        ? // eslint-disable-next-line prefer-spread
          temp.apply(null, args)
        : temp
      : choice;
    return message;
  }

  sendKeyboard(ctx: TempTelegramCTX, choice: keyof KeyboardType): any {
    const language = ctx.session.language;
    const keyboard = new Keyboard(language);

    return {
      ...keyboard[choice](),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    };
  }

  async sendReply(
    ctx: TempTelegramCTX,
    choice: keyof MessagePackType,
    keyboard?: keyof KeyboardType,
    ...args: any[]
  ) {
    const message = this.sendMessage(ctx, choice, ...args);
    const button = keyboard
      ? this.sendKeyboard(ctx, keyboard)
      : { parse_mode: 'HTML', disable_web_page_preview: true };
    return await ctx.reply(message, button);
  }

  async sendWithGoChannel(
    ctx: TempTelegramCTX,
    choice: keyof MessagePackType,
    channel: string,
    referral: boolean,
    ...args: any[]
  ) {
    const message = this.sendMessage(ctx, choice, ...args);
    const language = ctx.session.language;
    const keyboard = new Keyboard(language);
    const button = keyboard['gotoGameMenu'](
      `tg://resolve?domain=${channel}`,
      referral
    );

    return await ctx.reply(message, {
      ...button,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  }

  goChannelButton(language: cnst.Language, channel: string, referral: boolean) {
    const keyboard = new Keyboard(language);
    return keyboard['gotoGameMenu'](`tg://resolve?domain=${channel}`, referral);
  }

  async setLanguage(ctx: TempTelegramCTX, language: cnst.Language) {
    const { id } = ctx.from;
    const user = await this.userService.getUser(id);
    await user.merge({ language }).save();
    ctx.session.language = language;
    await this.sendReply(ctx, 'completeLanguage', 'mainMenu');
  }
}
