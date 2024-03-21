import { Logger, UseFilters } from '@nestjs/common';
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
import {
  BackMenu,
  MainMenu,
  ReferralMenu,
  WithdrawMenu,
} from '../realTime.front';
import { messageForm, referralMessage } from '../realTime.message';
import { TempTelegramCTX } from '../realTime.update';

@UseFilters(TelegrafExceptionFilter)
@Scene('special-referral')
export class SpecialReferralScene {
  constructor(
    private readonly userService: UserService,
    private readonly languageService: LanguageService
  ) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'enterReferral', 'backMenu');
  }

  // @On('message')

  @Hears(new RegExp(`^((?!(${buttonSet['back'].join('|')})).)*$`))
  async onMessage(
    @Ctx() ctx: TempTelegramCTX,
    @Message('text') code: string,
    @Sender('id') tid: number
  ) {
    try {
      await this.userService.registerSpecialReferral(tid, code);
      await ctx.scene.enter('main');
      Logger.log(`Use Special Referral Code[${tid}]`);
      await this.languageService.sendReply(ctx, 'registerSpecial', 'mainMenu');
    } catch (e) {
      await this.languageService.sendReply(ctx, 'anyReferral', 'backMenu');
    }
  }

  @Hears(buttonSet['back'])
  async onLeaveCommand(
    @Ctx() ctx: TempTelegramCTX,
    @Sender('id') tid: number
  ): Promise<void> {
    const user = await this.userService.getUser(tid);
    await this.languageService.sendReply(ctx, 'referral', 'referralMenu', user);
    await ctx.scene.enter('main');
  }
}
