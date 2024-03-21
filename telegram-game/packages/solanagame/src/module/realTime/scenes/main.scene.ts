import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { cnst, Utils } from '@shared/util';
import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  Message,
  Sender,
  Scene,
  SceneEnter,
  SceneLeave,
  Action,
  Command,
} from 'nestjs-telegraf';
import { TelegrafContextType } from 'nestjs-telegraf';
import { env } from 'packages/solanagame/src/environments/env';
import { AdminGuard } from 'packages/solanagame/src/middlewares/adminGuard';
import { TelegrafExceptionFilter } from 'packages/solanagame/src/middlewares/exceptionHandler';
import { Context, Markup, Scenes } from 'telegraf';
import { ContractService } from '../../contract/contract.service';
import { UserService } from '../../user/user.service';
import { DepositListService } from '../../waiting/waiting.service';
import {
  helpMessage1,
  helpMessage2,
  helpMessage3,
  helpMessage4,
} from '../realTime.message';
import {
  AdminMenu,
  DepositMenu,
  GotoGameMenu,
  HelpMenu,
  MainMenu,
  ReferralMenu,
  WithdrawMenu,
} from '../realTime.front';
import {
  dashboardMessage,
  depositMessage,
  messageForm,
  referralMessage,
  setAmountMessage,
  withdrawMessage,
} from '../realTime.message';
import { RealTimeService } from '../realTime.service';
import { LanguageService } from '../../language/language.service';
import { TempTelegramCTX } from '../realTime.update';
import { buttonSet, mainnn } from '../../language/languagePack/button';

@UseFilters(TelegrafExceptionFilter)
@Scene('main')
export class MainScene {
  constructor(
    private readonly realTimeService: RealTimeService,
    private readonly userService: UserService,
    private readonly depositService: DepositListService,
    private readonly languageService: LanguageService,
    private readonly contractService: ContractService
  ) {}
  //   @SceneEnter()
  //   async mainStart(@Ctx() ctx: Context) {
  //     await ctx.reply('Select Menu', { ...MainMenu });
  //   }
  @Hears(buttonSet['back'])
  async Back(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'select', 'mainMenu');
  }
  @Hears(['1', '2', '3', '4', '5', '10', '20', '30', '40'])
  async setAmount(
    @Ctx() ctx: TempTelegramCTX,
    @Message('text') amount: string,
    @Sender('id') id: number
  ) {
    try {
      const amountInt = parseInt(amount);
      await this.userService.registerAmount(id, amountInt);
      await this.languageService.sendWithGoChannel(
        ctx,
        'setAmount',
        env.channel,
        false,
        amountInt
      );
    } catch {
      await this.languageService.sendReply(ctx, 'amountError', 'mainMenu');
    }
  }

  @Hears(buttonSet['mainMenu'])
  async dashboard(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    await this.languageService.sendWithGoChannel(
      ctx,
      'dashboard',
      env.channel,
      true,
      await this.userService.getUser(tid)
    );
  }
  @Hears(buttonSet['deposit'])
  async deposit(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    const user = await this.userService.getUser(tid);
    if (user.status === 'restricted') {
      !ctx.session?.banned && (ctx.session.banned = true);
      await this.languageService.sendReply(ctx, 'restrict');
    } else {
      await ctx.reply(user.gameWallet);
      await this.languageService.sendReply(ctx, 'deposit', 'depositMenu', user);
    }
  }
  @Action('XLSX')
  async low(@Ctx() ctx: Context, @Sender('id') tid: number) {
    const buffer = await this.userService.referralList2Xlsx(tid);
    await ctx.sendDocument({
      source: buffer,
      filename: `${tid}-referral.xlsx`,
    });
    await ctx.answerCbQuery('Download xlsx', { cache_time: 10 });
  }

  @Hears(buttonSet['depositCheck'])
  async depositCheck(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    try {
      await this.languageService.sendReply(ctx, 'checkDeposit');
      //user가져와서 wallet입금리스트 조회 후 user최신화 및 depositList최신화
      const depositAmount = await this.realTimeService.depositCheck(tid);
      if (depositAmount === 0) {
        await this.languageService.sendReply(ctx, 'anyDeposit', 'depositMenu');
      } else {
        await this.languageService.sendReply(
          ctx,
          'completeDeposit',
          'mainMenu',
          depositAmount
        );
      }
    } catch (e) {
      await this.languageService.sendReply(ctx, 'retry', 'mainMenu');
    }
  }

  @Hears(buttonSet['withdraw'])
  async withdraw(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    const user = await this.userService.getUser(tid);
    if (user.status === 'restricted') {
      !ctx.session?.banned && (ctx.session.banned = true);
      await this.languageService.sendReply(ctx, 'restrict');
    } else
      await this.languageService.sendReply(
        ctx,
        'withdraw',
        'withdrawMenu',
        user
      );
  }

  @Hears(buttonSet['setAddress'])
  async withdrawSetting(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number
  ) {
    const user = await this.userService.getUser(tid);
    await ctx.scene.enter('withdraw-setting');
  }

  @Hears(buttonSet['withdrawApply'])
  async withdrawConfirm(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter('withdraw-confirm');
  }

  @Hears(buttonSet['referral'])
  async referral(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    const user = await this.userService.getUser(tid);
    await this.languageService.sendReply(ctx, 'referral', 'referralMenu', user);
  }

  @Hears(buttonSet['levelUp'])
  async levelUp(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    try {
      const user = await this.userService.levelUp(tid);
      await this.languageService.sendReply(
        ctx,
        'completeLevelUp',
        undefined,
        env.referral[user.level - 1].price,
        user.level
      );
    } catch (e) {
      await this.languageService.sendReply(ctx, e.message);
    }
  }

  @Hears(buttonSet['exchange'])
  async exchange(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    try {
      const amount = await this.userService.exchangeReferral(tid);
      await this.depositService.addExchangeList(tid, amount);
      await this.languageService.sendReply(
        ctx,
        'completeExchange',
        undefined,
        amount
      );
    } catch (e) {
      await this.languageService.sendReply(ctx, 'noExchange');
    }
  }
  @Hears(buttonSet['specielReferral'])
  async specialReferral(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter('special-referral');
  }

  @Hears(buttonSet['help'])
  async help(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'help', 'helpMenu');
  }

  @Hears(buttonSet['language'])
  async language(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'selectLanguage', 'languageMenu');
  }

  @Hears([
    '🇺🇸 English',
    '🇰🇷 한국어',
    '🇯🇵 日本語',
    '🇮🇩 Indonesia',
    '🇨🇳 中文',
    '🇯🇵 日本語',
    '🇷🇺 Русский',
    '🇻🇳 Tiếng Việt',
  ])
  async selectLanguage(
    @Ctx() ctx: TempTelegramCTX,
    @Message('text') input: string
  ) {
    let language: cnst.Language;
    switch (input) {
      case '🇺🇸 English':
        language = 'english';
        break;
      case '🇰🇷 한국어':
        language = 'korean';
        break;
      case '🇯🇵 日本語':
        language = 'japanese';
        break;
      case '🇮🇩 Indonesia':
        language = 'indonesian';
        break;
      case '🇨🇳 中文':
        language = 'chinese';
        break;
      case '🇷🇺 Русский':
        language = 'russian';
        break;
      case '🇻🇳 Tiếng Việt':
        language = 'vietnamese';
        break;
      default:
        language = 'english';
        break;
    }

    await this.languageService.setLanguage(ctx, language);
  }

  @Hears(buttonSet['helpMenu1'])
  async help1(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'help1', 'helpMenu');
  }

  @Hears(buttonSet['helpMenu2'])
  async help2(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'help2', 'helpMenu');
  }

  @Hears(buttonSet['helpMenu3'])
  async help3(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'help3', 'helpMenu');
  }

  @Hears(buttonSet['helpMenu4'])
  async help4(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'help4', 'helpMenu');
  }

  @UseGuards(AdminGuard)
  @Command('admin')
  async enterAdmin(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter('admin');
    await ctx.reply('Please Select Menu', {
      ...AdminMenu,
      parse_mode: 'HTML',
    });
  }
}
