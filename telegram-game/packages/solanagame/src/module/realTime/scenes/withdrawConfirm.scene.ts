import { Logger, UseFilters } from '@nestjs/common';
import { Utils } from '@shared/util';
import {
  Scene,
  SceneEnter,
  SceneLeave,
  Command,
  Hears,
  On,
  Ctx,
  Message,
  Sender,
} from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from 'packages/solanagame/src/middlewares/exceptionHandler';
import { Scenes } from 'telegraf';
import { LanguageService } from '../../language/language.service';
import { buttonSet } from '../../language/languagePack/button';
import { UserService } from '../../user/user.service';
// import { SceneContext } from 'telegraf/typings/scenes';
import { BackMenu, WithdrawMenu } from '../realTime.front';
import { messageForm, withdrawConfirmMessage } from '../realTime.message';
import { RealTimeService } from '../realTime.service';
import { TempTelegramCTX } from '../realTime.update';

@UseFilters(TelegrafExceptionFilter)
@Scene('withdraw-confirm')
export class WithdrawConfirmScene {
  constructor(
    private readonly realTimeService: RealTimeService,
    private readonly userService: UserService,
    private readonly languageService: LanguageService
  ) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    const user = await this.userService.getUser(tid);
    await this.languageService.sendReply(
      ctx,
      'withdrawConfirm',
      'backMenu',
      user
    );
  }

  // @On('message')

  @Hears(new RegExp(`^((?!(${buttonSet['back'].join('|')})).)*$`))
  async onMessage(
    @Ctx() ctx: TempTelegramCTX,
    @Message('text') amount: string,
    @Sender('id') tid: number
  ) {
    try {
      await this.realTimeService.withdrawApply(tid, Utils.decimalSlice(amount));
      await ctx.scene.enter('main');
      await this.languageService.sendReply(
        ctx,
        'completeWithdraw',
        'withdrawMenu',
        amount
      );
    } catch (e) {
      Logger.error(`Withdraw Error: ${e.message}`);
      await this.languageService.sendReply(ctx, e.message, 'backMenu');
    }
    // await this.onLeaveCommand(ctx);
  }

  @Hears(buttonSet['back'])
  async onLeaveCommand(@Ctx() ctx: TempTelegramCTX): Promise<void> {
    await this.languageService.sendReply(ctx, 'cancelWithdraw', 'withdrawMenu');
    await ctx.scene.enter('main');
    // await ctx.scene.leave();
  }
}
