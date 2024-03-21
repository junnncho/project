import { UseFilters } from '@nestjs/common';
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
import { messageForm } from '../realTime.message';
import { RealTimeService } from '../realTime.service';
import { TempTelegramCTX } from '../realTime.update';

@UseFilters(TelegrafExceptionFilter)
@Scene('withdraw-setting')
export class WithdrawSetScene {
  constructor(
    private readonly userService: UserService,
    private readonly realTimeService: RealTimeService,
    private readonly languageService: LanguageService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'enterAddress', 'backMenu');
  }

  // @On('message')

  @Hears(new RegExp(`^((?!(${buttonSet['back'].join('|')})).)*$`))
  async onMessage(
    @Ctx() ctx: TempTelegramCTX,
    @Message('text') wallet: string,
    @Sender('id') id: number
  ) {
    try {
      if (!(await Utils.verifyWallet(wallet)))
        throw new Error('invalidAddress');
      await this.userService.registerWallet(id, wallet);
      await ctx.scene.enter('main');
      await this.languageService.sendReply(
        ctx,
        'completeAddress',
        'withdrawMenu',
        wallet
      );
    } catch (e) {
      await this.languageService.sendReply(ctx, e.message, 'backMenu');
    }
  }

  @Hears(buttonSet['back'])
  async onLeaveCommand(@Ctx() ctx: TempTelegramCTX): Promise<void> {
    await ctx.scene.enter('main');
    await this.languageService.sendReply(ctx, 'cancelAddress', 'withdrawMenu');
    // await ctx.scene.leave();
  }
}
