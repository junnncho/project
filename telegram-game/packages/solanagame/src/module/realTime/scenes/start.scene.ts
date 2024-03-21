import { UseFilters } from '@nestjs/common';
import {
  Scene,
  SceneEnter,
  SceneLeave,
  Command,
  Hears,
  On,
  Ctx,
  Message,
} from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from 'packages/solanagame/src/middlewares/exceptionHandler';
import { Scenes } from 'telegraf';
import { buttonSet } from '../../language/languagePack/button';
// import { SceneContext } from 'telegraf/typings/scenes';
import { BackMenu, SignupMenu, WithdrawMenu } from '../realTime.front';
import { messageForm } from '../realTime.message';

@UseFilters(TelegrafExceptionFilter)
@Scene('start')
export class StartScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.reply(messageForm('Select your referral part.'), {
      ...SignupMenu,
      parse_mode: 'HTML',
    });
  }

  @Hears('Normal Referral')
  async onNormalReferralCommand(
    @Ctx() ctx: Scenes.SceneContext
  ): Promise<void> {
    await ctx.scene.enter('normal-referral');
  }

  @Hears('Special Referral')
  async onSpecialReferralCommand(
    @Ctx() ctx: Scenes.SceneContext
  ): Promise<void> {
    await ctx.scene.enter('special-referral');
  }

  @Hears(new RegExp(`^((?!(${buttonSet['back'].join('|')})).)*$`))
  async onMessage(
    @Ctx() ctx: Scenes.SceneContext,
    @Message('text') text: string
  ) {
    // console.log(text);
    // await this.onLeaveCommand(ctx);
  }
}
