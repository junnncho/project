import { UseFilters, UseGuards } from '@nestjs/common';
import { LogService } from '@shared/util-server';
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
import {
  AdminGuard,
  RootGuard,
} from 'packages/solanagame/src/middlewares/adminGuard';
import { TelegrafExceptionFilter } from 'packages/solanagame/src/middlewares/exceptionHandler';
import { Scenes } from 'telegraf';
import { UserService } from '../../user/user.service';
// import { SceneContext } from 'telegraf/typings/scenes';
import { AdminMenu, BackMenu, WithdrawMenu } from '../realTime.front';
import { messageForm } from '../realTime.message';

@UseFilters(TelegrafExceptionFilter)
@Scene('admin-ban')
export class AdminBanScene extends LogService {
  constructor(private readonly userService: UserService) {
    super(AdminBanScene.name);
  }
  @SceneEnter()
  async onSceneEnter(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number
  ) {
    await ctx.reply(messageForm('Who do you want to ban?'), {
      ...BackMenu,
      parse_mode: 'HTML',
    });
  }

  // @On('message')
  @UseGuards(RootGuard)
  @Hears(new RegExp(/^((?!< Back).)*$/))
  async onMessage(
    @Ctx() ctx: Scenes.SceneContext,
    @Message('text') tid: string
  ) {
    try {
      await this.userService.banUser(parseInt(tid));
      await ctx.scene.enter('admin');
      await ctx.reply(messageForm(`Complete to ban user ${tid}`), {
        ...AdminMenu,
        parse_mode: 'HTML',
      });
    } catch (e) {
      this.logger.error(`[${tid}]: fail to ban user`);
      await ctx.reply(messageForm(e.message), {
        ...BackMenu,
        parse_mode: 'HTML',
      });
    }
    // await this.onLeaveCommand(ctx);
  }

  @UseGuards(AdminGuard)
  @Hears('< Back')
  async onLeaveCommand(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.reply(messageForm('ban service cancelled.'), {
      ...WithdrawMenu,
      parse_mode: 'HTML',
    });
    await ctx.scene.enter('admin');
    // await ctx.scene.leave();
  }
}
