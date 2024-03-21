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
import { env } from 'packages/solanagame/src/environments/env';
import { TelegrafExceptionFilter } from 'packages/solanagame/src/middlewares/exceptionHandler';
import { Scenes } from 'telegraf';
import { LanguageService } from '../../language/language.service';
import { buttonSet } from '../../language/languagePack/button';
import { UserService } from '../../user/user.service';
import { BackMenu, GotoGameMenu, MainMenu } from '../realTime.front';
import { dashboardMessage, messageForm } from '../realTime.message';
import { TempTelegramCTX } from '../realTime.update';

@UseFilters(TelegrafExceptionFilter)
@Scene('normal-referral')
export class NormalReferralScene {
  constructor(
    private readonly userService: UserService,
    private readonly languageService: LanguageService
  ) {}
  @SceneEnter()
  async onSceneEnter(
    @Ctx() ctx: Scenes.SceneContext & TempTelegramCTX,
    @Sender('id') id: number
  ) {
    Logger.log(`FirstPage: Newbie Come[${id}]`);
    if (ctx.session.code) {
      await this.languageService.sendReply(ctx, 'processing');
      await this.onMessage(ctx, ctx.session.code, id);
    } else {
      await this.languageService.sendReply(ctx, 'enterReferral');
    }
  }

  // @On('message')
  @Hears(new RegExp(`^((?!(${buttonSet['back'].join('|')})).)*$`))
  async onMessage(
    @Ctx() ctx: TempTelegramCTX,
    @Message('text') code: string,
    @Sender('id') id: number
  ) {
    try {
      if (!ctx.chat?.id) throw new Error('Not found chatId');
      const user = await this.userService.signUpNormalReferral(
        id,
        ctx.chat.id,
        code
      );
      Logger.log(`SignUp Finish[${id}]`);

      await this.languageService.sendReply(ctx, 'signUp', 'mainMenu');
      await ctx.scene.enter('main');
      await this.languageService.sendWithGoChannel(
        ctx,
        'dashboard',
        env.channel,
        true,
        user
      );
    } catch (e) {
      Logger.error(`SignUp:${e.message}`);
      await this.languageService.sendReply(ctx, 'anyReferral', 'backMenu');
    }
  }

  //   @Hears('< Back')
  //   async onLeaveCommand(ctx: Scenes.SceneContext): Promise<void> {
  //     await ctx.scene.enter('start');
  //   }
}
