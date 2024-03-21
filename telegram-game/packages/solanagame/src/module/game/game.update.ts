import { Logger } from '@nestjs/common';
import {
  Update,
  Ctx,
  Start,
  Help,
  Sender,
  Action,
  Message,
  Hears,
} from 'nestjs-telegraf';
import { Context, Markup, Scenes } from 'telegraf';
import { BettingService } from '../betting/betting.service';
import { UserService } from '../user/user.service';
import { GameService } from './game.service';

@Update()
export class GameUpdate {
  constructor(
    private readonly bettingService: BettingService,
    private readonly gameService: GameService,
    private readonly userService: UserService
  ) {}
  @Action('LOW')
  async low(@Ctx() ctx: Context, @Sender('id') tid: number) {
    const messageId = ctx.callbackQuery?.message?.message_id;
    if (!messageId)
      await ctx.answerCbQuery('Telegram Error', { cache_time: 10 });
    else {
      try {
        const game = await this.gameService.getGameByMessageId(messageId);
        await this.bettingService.betting(tid, game, 'LOW');
        await ctx.answerCbQuery('Betting Complete: LOW', { cache_time: 2 });
      } catch (e) {
        await ctx.answerCbQuery(e.message, { cache_time: 2 });
      }
    }
  }

  @Action('HIGH')
  async high(@Ctx() ctx: Scenes.SceneContext, @Sender('id') tid: number) {
    const messageId = ctx.callbackQuery?.message?.message_id;
    if (!messageId) await ctx.answerCbQuery('Telegram Error');
    else {
      try {
        const game = await this.gameService.getGameByMessageId(messageId);
        await this.bettingService.betting(tid, game, 'HIGH');
        await ctx.answerCbQuery('Betting Complete: HIGH', { cache_time: 2 });
      } catch (e) {
        await ctx.answerCbQuery(e.message, { cache_time: 2 });
      }
    }
  }

  @Action('ODD')
  async odd(@Ctx() ctx: Scenes.SceneContext, @Sender('id') tid: number) {
    const messageId = ctx.callbackQuery?.message?.message_id;
    if (!messageId) await ctx.answerCbQuery('Telegram Error');
    else {
      try {
        const game = await this.gameService.getGameByMessageId(messageId);
        await this.bettingService.betting(tid, game, 'ODD');
        await ctx.answerCbQuery('Betting Complete: ODD', { cache_time: 2 });
      } catch (e) {
        await ctx.answerCbQuery(e.message, { cache_time: 2 });
      }
    }
  }

  @Action('EVEN')
  async even(@Ctx() ctx: Scenes.SceneContext, @Sender('id') tid: number) {
    const messageId = ctx.callbackQuery?.message?.message_id;
    if (!messageId) await ctx.answerCbQuery('Telegram Error');
    else {
      try {
        const game = await this.gameService.getGameByMessageId(messageId);
        await this.bettingService.betting(tid, game, 'EVEN');
        await ctx.answerCbQuery('Betting Complete: EVEN', { cache_time: 2 });
      } catch (e) {
        await ctx.answerCbQuery(e.message, { cache_time: 2 });
      }
    }
  }

  @Hears('TEST_GAME_UPDATE_FEDERATION_LOCAL_MODULE')
  async testGameUpdate() {
    this.gameService.testGameService();
    Logger.debug('GameField: TEST_PASSED');
  }
}
