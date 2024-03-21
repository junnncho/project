import { OnModuleInit, UseFilters, UseGuards } from '@nestjs/common';
import { LogService } from '@shared/util-server';
import {
  Update,
  Ctx,
  Start,
  Help,
  Sender,
  On,
  InjectBot,
  Hears,
  Command,
} from 'nestjs-telegraf';
import { Context, Markup, Scenes, Telegraf } from 'telegraf';
import { SceneSessionData } from 'telegraf/typings/scenes';
import { env } from '../../environments/env';
import { TelegrafExceptionFilter } from '../../middlewares/exceptionHandler';
import { LanguageService } from '../language/language.service';
import { UserService } from '../user/user.service';
export interface TempTelegramCTX {
  session: {
    code?: string;
    __scenes?: SceneSessionData;
    language: string;
    banned?: boolean;
  };
  message: { text: string };
  chat: { id: number };
  scene: any;
  reply: any;
  from: any;
}

@UseFilters(TelegrafExceptionFilter)
@Update()
export class RealTimeUpdate extends LogService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly languageService: LanguageService,
    @InjectBot('realtime-bot')
    private readonly bot: Telegraf<Scenes.SceneContext>
  ) {
    super(RealTimeUpdate.name);
  }

  async onModuleInit() {
    try {
      await this.bot.telegram.getMe();
      this.logger.log('Bot Connection Success');
    } catch (e) {
      this.logger.error('Bot Connection Error');
    }
  }

  @Start()
  async start(@Ctx() ctx: TempTelegramCTX, @Sender('id') tid: number) {
    try {
      const user = await this.userService.getUser(tid);
      if (user.status !== 'active') {
        await this.languageService.sendReply(ctx, 'restrict');
        this.logger.error('Not active user access');
        return;
      }
      await user.merge({ chatId: ctx.chat?.id }).save();
      await this.languageService.sendReply(ctx, 'select', 'mainMenu');
      await ctx.scene.enter('main');
      await this.languageService.sendWithGoChannel(
        ctx,
        'dashboard',
        env.channel,
        true,
        user
      );
    } catch (e) {
      this.logger.debug(`Go to Signup Scene | Error: ${e.message}`);
      ctx.session.code = ctx.message?.text?.split(' ')[1];
      await ctx.scene.enter('normal-referral');
    }
  }

  @Help()
  async help(@Ctx() ctx: TempTelegramCTX) {
    await this.languageService.sendReply(ctx, 'select', 'mainMenu');
  }

  @Command('main')
  async createButton(@Ctx() ctx: TempTelegramCTX) {
    if (!ctx.from) throw new Error('Not found chatId');
    const user = await this.userService.getUser(ctx.from?.id);
    if (user.status !== 'active') {
      await this.languageService.sendReply(ctx, 'restrict');
    } else {
      await ctx.scene.enter('main');
      await this.languageService.sendReply(ctx, 'select', 'mainMenu');
    }
  }
}
