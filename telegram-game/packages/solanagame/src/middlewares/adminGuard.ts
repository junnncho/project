import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  TelegrafExecutionContext,
  TelegrafException,
  InjectBot,
} from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { AdminMenu, MainMenu } from '../module/realTime/realTime.front';
import { UserService } from '../module/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    @InjectBot('realtime-bot')
    private readonly bot: Telegraf<Scenes.SceneContext>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    Logger.log('Admin Page Access');
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Scenes.SceneContext>();
    if (!from) throw new Error('Not found tid');
    const user = await this.userService.getUser(from?.id);
    if (user.status === 'restricted')
      throw new TelegrafException('You are restricted');
    if (user.role === 'user') {
      await this.bot.telegram.sendMessage(
        user.chatId,
        'You are not admin user',
        MainMenu
      );
      throw new TelegrafException('You are normal user');
    }
    return true;
  }
}

@Injectable()
export class RootGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    @InjectBot('realtime-bot')
    private readonly bot: Telegraf<Scenes.SceneContext>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    Logger.log('Root Page Access');
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Scenes.SceneContext>();
    if (!from) throw new Error('Not found tid');
    const user = await this.userService.getUser(from?.id);
    if (user.status === 'restricted')
      throw new TelegrafException('You are restricted');
    if (user.role !== 'root') {
      await this.bot.telegram.sendMessage(
        user.chatId,
        'You are not root user',
        AdminMenu
      );
      throw new TelegrafException('You are not root user');
    }
    return true;
  }
}
