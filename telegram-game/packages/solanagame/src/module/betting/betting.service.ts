import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { cnst } from '@shared/util';
import { Id, LoadService } from '@shared/util-server';
import { UserService } from '../user/user.service';
import * as Betting from './betting.model';
import { GameService } from '../game/game.service';
import { Doc as Game } from '../game/game.model';
import { env } from '../../environments/env';
import { InjectBot } from 'nestjs-telegraf';
import { bettingComplete } from '../game/game.message';
import { messageForm } from '../realTime/realTime.message';
import { LanguageService } from '../language/language.service';

export interface BettingProps {
  amount: { low: number; high: number; even: number; odd: number };
  people: { low: number; high: number; even: number; odd: number };
}

@Injectable()
export class BettingService extends LoadService<Betting.Mdl, Betting.Doc> {
  constructor(
    @InjectModel(Betting.name)
    private readonly Betting: Betting.Mdl,
    private readonly userService: UserService,
    private readonly languageService: LanguageService,
    @InjectBot('realtime-bot') private readonly bot: any
  ) {
    super(BettingService.name, Betting);
  }
  async newBetting(): Promise<any> {
    return { message: 'Welcome to gamble-bot!' };
  }
  async deleteBettingsByGameId(gameId: Id): Promise<void> {
    await this.Betting.deleteMany({ game: gameId });
  }

  async getBettingsByGameId(gameId: Id): Promise<Betting.Doc[]> {
    return await this.Betting.find({ game: gameId, status: 'pending' });
  }

  async currentBettingStatus(gameId: Id): Promise<BettingProps> {
    try {
      const betting = await this.Betting.findByGameId(gameId);
      const low = betting.filter((b) => b.choice === 'LOW');
      let lowPrice = 0;
      low.forEach((elem) => {
        lowPrice += elem.amount;
      });
      const high = betting.filter((b) => b.choice === 'HIGH');
      let highPrice = 0;
      high.forEach((elem) => {
        highPrice += elem.amount;
      });
      const even = betting.filter((b) => b.choice === 'EVEN');
      let evenPrice = 0;
      even.forEach((elem) => {
        evenPrice += elem.amount;
      });
      const odd = betting.filter((b) => b.choice === 'ODD');
      let oddPrice = 0;
      odd.forEach((elem) => {
        oddPrice += elem.amount;
      });
      const result = {
        amount: {
          low: lowPrice,
          high: highPrice,
          even: evenPrice,
          odd: oddPrice,
        },
        people: {
          low: low.length,
          high: high.length,
          even: even.length,
          odd: odd.length,
        },
      };
      return result;
    } catch {
      return {
        amount: { low: 0, high: 0, even: 0, odd: 0 },
        people: { low: 0, high: 0, even: 0, odd: 0 },
      };
    }
  }
  async cleanBettings(): Promise<any> {
    return { message: 'Welcome to gamble-bot!' };
  }
  async betting(
    tid: number,
    game: Game,
    choice: cnst.GameChoice
  ): Promise<void> {
    const user = await this.userService.getUser(tid);
    if (user.status !== 'active') throw new Error('You are restricted!');
    const choiceGroup = ['LOW', 'HIGH'].includes(choice)
      ? ['LOW', 'HIGH']
      : ['EVEN', 'ODD'];
    if (
      await this.Betting.exists({
        user: user._id,
        game: game._id,
        choice: { $in: choiceGroup },
      })
    )
      throw new Error('You already betted!');
    await user.changePoint(-user.bettingAmount).save();
    const betting = await this.Betting.create({
      user: user._id,
      game: game._id,
      choice,
      amount: user.bettingAmount,
    });
    user?.chatId &&
      (await this.bot.telegram.sendMessage(
        user.chatId,
        this.languageService.translateMessage(
          user.language,
          'bettingComplete',
          betting
        ),
        { parse_mode: 'HTML' }
      ));
    const ancestor = await this.userService.getUserById(user.ancestor);
    let referral =
      user.bettingAmount * env.referral[ancestor.level - 1].percent;
    if (ancestor.specials.includes('Referral0.8%'))
      referral = Math.max(user.bettingAmount * 0.008, referral);
    if (ancestor.specials.includes('Referral1.2%'))
      referral = Math.max(user.bettingAmount * 0.012, referral);
    await ancestor.changePoint(referral, 'referralIn').save();
    await ancestor.changePoint(referral, 'referralPoint').save();
    await user.changePoint(referral, 'referralOut').save();
  }
}
