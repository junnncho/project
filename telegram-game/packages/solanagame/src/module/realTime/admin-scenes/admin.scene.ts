import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { Utils } from '@shared/util';
import { LogService } from '@shared/util-server';
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
} from 'nestjs-telegraf';
import { TelegrafContextType } from 'nestjs-telegraf';
import { env } from 'packages/solanagame/src/environments/env';
import {
  AdminGuard,
  RootGuard,
} from 'packages/solanagame/src/middlewares/adminGuard';
import { TelegrafExceptionFilter } from 'packages/solanagame/src/middlewares/exceptionHandler';
import { Context, Markup, Scenes } from 'telegraf';
import { ContractService } from '../../contract/contract.service';
import { HistoryService } from '../../history/history.service';
import { LanguageService } from '../../language/language.service';
import { SpecialReferralService, UserService } from '../../user/user.service';
import { DepositListService } from '../../waiting/waiting.service';
import {
  AdminMenu,
  DepositMenu,
  GenerateReferralMenu,
  GotoGameMenu,
  MainMenu,
  ReferralMenu,
  WithdrawMenu,
} from '../realTime.front';
import {
  dashboardMessage,
  depositMessage,
  depositRootMessage,
  mainWalletMessage,
  messageForm,
  referralMessage,
  setAmountMessage,
  withdrawMessage,
} from '../realTime.message';
import { RealTimeService } from '../realTime.service';
import { TempTelegramCTX } from '../realTime.update';

@UseFilters(TelegrafExceptionFilter)
@Scene('admin')
export class AdminScene extends LogService {
  constructor(
    private readonly realTimeService: RealTimeService,
    private readonly userService: UserService,
    private readonly depositService: DepositListService,
    private readonly contractService: ContractService,
    private readonly historyService: HistoryService,
    private readonly specialReferralService: SpecialReferralService,
    private readonly languageService: LanguageService
  ) {
    super(AdminScene.name);
  }
  //   @SceneEnter()
  //   async mainStart(@Ctx() ctx: Context) {
  //     await ctx.reply('Select Menu', { ...MainMenu });
  //   }
  @UseGuards(AdminGuard)
  @Hears('User')
  async getUser(@Ctx() ctx: Scenes.SceneContext, @Sender('id') tid: number) {
    this.logger.log(`[${tid}]: get users`);
    await ctx.reply(messageForm(`Processing[User]`), {
      parse_mode: 'HTML',
    });
    const buffer = await this.userService.userList2Xlsx();
    await ctx.sendDocument({ source: buffer, filename: `users.xlsx` });
  }

  @UseGuards(AdminGuard)
  @Hears('GameHistory')
  async gameHistory(@Ctx() ctx: Context, @Sender('id') tid: number) {
    this.logger.log(`[${tid}]: get gameHistories`);
    await ctx.reply(messageForm(`Processing[GameHistory]`), {
      parse_mode: 'HTML',
    });
    const buffer = await this.historyService.histories2Xlsx();
    await ctx.sendDocument({ source: buffer, filename: `histories.xlsx` });
  }

  @UseGuards(AdminGuard)
  @Hears('BankBook')
  async bankBook(@Ctx() ctx: Context, @Sender('id') tid: number) {
    this.logger.log(`[${tid}]: get bankBooks`);
    await ctx.reply(messageForm(`Processing[BankBook]`), {
      parse_mode: 'HTML',
    });
    const buffer = await this.depositService.depositList2Xlsx();
    await ctx.sendDocument({ source: buffer, filename: `bank-book.xlsx` });
  }

  @UseGuards(AdminGuard)
  @Hears('Referral')
  async specialReferral(@Ctx() ctx: Context, @Sender('id') tid: number) {
    this.logger.log(`[${tid}]: get all referral code`);
    await ctx.reply(messageForm(`Processing[Referral]`), {
      parse_mode: 'HTML',
    });
    const buffer = await this.specialReferralService.specialReferral2Xlsx();
    await ctx.sendDocument({
      source: buffer,
      filename: `special-referral.xlsx`,
    });
  }

  @UseGuards(RootGuard)
  @Hears('Generate Referral')
  async referralMaker(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number
  ) {
    this.logger.log(`[${tid}]: generate referral code`);
    await ctx.reply(messageForm(`Which referral do you want?(numbers 50)`), {
      ...GenerateReferralMenu,
      parse_mode: 'HTML',
    });
  }

  @UseGuards(RootGuard)
  @Hears('Ban User')
  async banUser(@Ctx() ctx: Scenes.SceneContext, @Sender('id') tid: number) {
    this.logger.log(`[${tid}]: try to ban user`);
    await ctx.scene.enter('admin-ban');
  }

  @UseGuards(RootGuard)
  @Hears('UnBan User')
  async unbanUser(@Ctx() ctx: Scenes.SceneContext, @Sender('id') tid: number) {
    this.logger.log(`[${tid}]: try to unban user`);
    await ctx.scene.enter('admin-unban');
  }

  @UseGuards(RootGuard)
  @Hears('Give Admin')
  async giveAdmin(@Ctx() ctx: Scenes.SceneContext, @Sender('id') tid: number) {
    this.logger.log(`[${tid}]: try to give admin user`);
    await ctx.scene.enter('admin-add');
  }

  @UseGuards(RootGuard)
  @Hears(['lv2', 'lv3', 'Referral0.8%', 'Referral1.2%'])
  async generateReferral(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number,
    @Message('text') message: string
  ) {
    this.logger.log(`[${tid}]: generate ${message} referral code`);
    await ctx.reply(messageForm(`Processing[Generate Referral]`), {
      parse_mode: 'HTML',
    });
    let level = 1;
    switch (message) {
      case 'lv2':
        level = 2;
        break;
      case 'lv3':
        level = 3;
        break;
      case 'highProfit':
        level = 10;
        break;
      case 'zeroWithdrawFee':
        level = 20;
        break;
      case 'Referral0.8%':
        level = 30;
        break;
      case 'Referral1.2%':
        level = 40;
        break;
    }
    const buffer = await this.specialReferralService.generateReferral(level);
    await ctx.reply(messageForm(`Generate Success`), {
      ...AdminMenu,
      parse_mode: 'HTML',
    });
    await ctx.sendDocument({ source: buffer, filename: `added-referral.xlsx` });
  }

  @UseGuards(AdminGuard)
  @Hears('Main Wallet')
  async getMainWallet(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number
  ) {
    this.logger.log(`[${tid}]: get mainwallet info`);
    const { balance, address } = await this.contractService.getMainWallet();
    const result = await this.depositService.todaySummary();
    await ctx.reply(mainWalletMessage(balance, address, result), {
      ...AdminMenu,
      parse_mode: 'HTML',
    });
  }

  @UseGuards(RootGuard)
  @Hears('Withdraw')
  async withdrawConfirm(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number
  ) {
    this.logger.log(`[${tid}]: try to withdraw from main wallet`);
    await ctx.scene.enter('admin-withdraw');
  }

  @UseGuards(RootGuard)
  @Hears('Deposit')
  async deposit(@Ctx() ctx: Context, @Sender('id') tid: number) {
    const user = await this.userService.getUser(tid);
    await ctx.reply(depositRootMessage(user), {
      ...DepositMenu,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  }

  @UseGuards(RootGuard)
  @Hears('Deposit Check')
  async deopsitCheck(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number
  ) {
    try {
      await ctx.reply(messageForm('Checking your deposit'), {
        parse_mode: 'HTML',
      });
      //user가져와서 wallet입금리스트 조회 후 user최신화 및 depositList최신화
      const depositAmount = await this.realTimeService.depositCheck(tid);
      if (depositAmount === 0) {
        await ctx.reply(
          messageForm(`You don't have any deposit: Retry Please`),
          {
            ...DepositMenu,
            parse_mode: 'HTML',
          }
        );
      } else {
        await ctx.reply(
          messageForm(`Complete to Check Your deposit: ${depositAmount} SOL`),
          { ...DepositMenu, parse_mode: 'HTML' }
        );
      }
    } catch (e) {
      await ctx.reply(messageForm(`Error: retry please.`), {
        ...DepositMenu,
        parse_mode: 'HTML',
      });
    }
  }

  @Hears('Main')
  async gotoMain(@Ctx() ctx: TempTelegramCTX) {
    await ctx.scene.enter('main');
    await this.languageService.sendReply(ctx, 'select', 'mainMenu');
  }

  @Hears('< Back')
  async initAdmin(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.reply('Please Select Menu', {
      ...AdminMenu,
      parse_mode: 'HTML',
    });
  }
}
