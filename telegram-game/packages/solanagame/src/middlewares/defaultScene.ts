import { Logger } from '@nestjs/common';
import { Scenes } from 'telegraf';
import { TempTelegramCTX } from '../module/realTime/realTime.update';

export const defaultScene = async (
  ctx: TempTelegramCTX,
  next: () => Promise<void>
) => {
  try {
    if (!ctx?.session) {
      ctx.session = { language: 'english' };
      await ctx.reply('Click ->   /start');
    } else {
      if (!ctx.session?.language) ctx.session.language = 'english';
      if (!ctx.session?.__scenes) await ctx.reply('Click ->   /start');
    }
  } catch (e) {
    Logger.error(e.message);
  }
  try {
    // if (ctx.session?.banned) await ctx.reply('You are restricted');else
    next();
  } catch (e) {
    Logger.error(`RealTimeService Error: ${e.message}`);
  }
};
