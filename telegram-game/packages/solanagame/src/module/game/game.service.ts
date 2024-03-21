import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Id, LoadService } from '@shared/util-server';
import * as Game from './game.model';
import { Raw as History } from '../history/history.model';
import { BlockStat } from '../history/history.model';
import { BettingProps, BettingService } from '../betting/betting.service';
import { InjectBot } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { HistoryService } from '../history/history.service';
import { EthereumOptions, TelegramOptions } from '../option';
import { BettingMenu, GotoDashboardMenu } from './game.front';
import { gameMessage, gameResult } from './game.message';
import { ethers } from 'ethers';
import { cnst, Utils } from '@shared/util';
import { UserService } from '../user/user.service';
import { env } from '../../environments/env';
import { postFix } from '../realTime/realTime.message';
import { dashboardFilter } from '../../middlewares/dashboardFilter';
import { LanguageService } from '../language/language.service';

export interface HistoryProps extends Partial<History> {
  startBlock: BlockStat;
  closeBlock: BlockStat;
  endBlock: BlockStat;
}

const randomBetting = (input: BettingProps): BettingProps => {
  const random1 = 2 + Math.floor(Math.random() * 10);
  const random2 = 2 + Math.floor(Math.random() * 10);
  const random3 = 2 + Math.floor(Math.random() * 10);
  const random4 = 2 + Math.floor(Math.random() * 10);
  const random = [
    Math.floor(Math.random() * 10 + 1),
    Math.floor(Math.random() * 10 + 1),
    Math.floor(Math.random() * 10 + 1),
    Math.floor(Math.random() * 10 + 1),
  ];
  const output = {
    amount: {
      low: input.amount.low + random1 * random[0],
      high: input.amount.high + random2 * random[1],
      odd: input.amount.odd + random3 * random[2],
      even: input.amount.even + random4 * random[3],
    },
    people: {
      low: input.people.low + random1,
      high: input.people.high + random2,
      odd: input.people.odd + random3,
      even: input.people.even + random4,
    },
  };
  return output;
};

const historyMaker = (
  id: Id,
  startBlock: BlockStat,
  close: number,
  target: number
) => ({
  gameId: id,
  startBlock: startBlock,
  closeBlock: {
    blockNumber: target - close,
    blockHash: '0x00-0000',
  },
  endBlock: {
    blockNumber: target,
    blockHash: '0x00-0000',
  },
});

@Injectable()
export class GameService
  extends LoadService<Game.Mdl, Game.Doc>
  implements OnModuleInit
{
  provider: ethers.providers.EtherscanProvider;
  history: HistoryProps;
  statistic: cnst.MixGameChoice[]; //'low', 'high' 33개
  completing: boolean;
  starting: boolean;
  test: boolean;
  random: number;
  betting: BettingProps;
  constructor(
    @InjectModel(Game.name)
    private readonly Game: Game.Mdl,
    // @Inject(forwardRef(() => BettingService))
    private readonly bettingService: BettingService,
    private readonly historyService: HistoryService,
    private readonly userService: UserService,
    private readonly languageService: LanguageService,
    @Inject('ETHER_OPTIONS') private readonly etherOptions: EthereumOptions,
    @Inject('TELEGRAM_OPTIONS')
    private readonly telegramOptions: TelegramOptions,
    @InjectBot('game-bot') private readonly bot: Telegraf<Scenes.SceneContext>,
    @InjectBot('realtime-bot')
    private readonly bot2: Telegraf<Scenes.SceneContext>
  ) {
    super(GameService.name, Game);
    this.provider = new ethers.providers.EtherscanProvider(
      this.etherOptions.network,
      this.etherOptions.etherscanKey
    );
    this.completing = false;
    this.starting = false;
    this.test = false;
    this.random = 0;
    this.betting = {
      amount: { low: 0, high: 0, odd: 0, even: 0 },
      people: { low: 0, high: 0, odd: 0, even: 0 },
    };
  }

  async onModuleInit() {
    try {
      await this.bot.telegram.getMe();
      this.logger.log('Bot Connection Success');
    } catch (e) {
      this.logger.error('Bot Connection Error');
    }
  }

  async getBlockHash(blockNumber: number): Promise<string> {
    const blockHash = (await this.provider.getBlock(blockNumber))?.hash;
    if (!blockHash) throw new Error('Block not found');
    return Utils.simplifyHash(blockHash);
  }

  async startGame(): Promise<void> {
    this.starting = true;
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const game = await this.Game.insert(
        blockNumber,
        this.telegramOptions.period
      );
      const blockStat = {
        blockNumber,
        blockHash: await this.getBlockHash(blockNumber),
      };
      this.betting = {
        amount: { low: 0, high: 0, odd: 0, even: 0 },
        people: { low: 0, high: 0, odd: 0, even: 0 },
      };
      try {
        this.statistic = await this.historyService.getHistorys();
        this.history = historyMaker(
          game._id,
          blockStat,
          this.telegramOptions.close,
          game.targetBlock
        );
        const message = await this.bot.telegram.sendMessage(
          this.telegramOptions.channel_chatId,
          gameMessage(this.history, blockStat, this.betting, this.statistic),
          { ...BettingMenu, parse_mode: 'HTML' }
        );
        await game.merge({ messageId: message.message_id }).save();
        this.logger.log(`StartBlock[${blockNumber}]: Success to Generage Game`);
      } catch (e) {
        this.logger.error(`StartBlock[${blockNumber}]: ${e.message}`);
      }
      this.starting = false;
    } catch (e) {
      this.starting = false;
    }
  }

  async getGame(blockNumber: number): Promise<void> {
    if (this.starting) throw new Error('Starting New Game');
    const game = await this.Game.get(blockNumber, this.telegramOptions.period);

    const startNum = game.targetBlock - this.telegramOptions.period;
    const blockStat = {
      blockNumber,
      blockHash: await this.getBlockHash(blockNumber),
    };
    if (!this.history) {
      this.history = historyMaker(
        game._id,
        { blockNumber: startNum, blockHash: await this.getBlockHash(startNum) },
        this.telegramOptions.close,
        game.targetBlock
      );
    }
    if (!this.statistic)
      this.statistic = await this.historyService.getHistorys();
    this.betting = randomBetting(this.betting);
    // let betting = await this.bettingService.currentBettingStatus(game._id);
    const leftBlock = game.targetBlock - blockStat.blockNumber;
    if (
      leftBlock < this.telegramOptions.period &&
      leftBlock > this.telegramOptions.close
    ) {
      try {
        if (game.messageId) {
          await this.bot.telegram.editMessageText(
            this.telegramOptions.channel_chatId,
            game.messageId,
            undefined,
            gameMessage(this.history, blockStat, this.betting, this.statistic),
            { ...BettingMenu, parse_mode: 'HTML' }
          );
        } else {
          const message = await this.bot.telegram.sendMessage(
            this.telegramOptions.channel_chatId,
            gameMessage(this.history, blockStat, this.betting, this.statistic),
            { ...BettingMenu, parse_mode: 'HTML' }
          );
          await game.merge({ messageId: message.message_id }).save();
        }

        this.logger.log(`MiddleBlock[${blockNumber}]: Edit Message`);
      } catch (e) {
        this.logger.error(`MiddleBlock[${blockNumber}]: ${e.message}`);
      }
    }
    if (leftBlock === this.telegramOptions.close) {
      try {
        await game.merge({ status: 'close' }).save();
        this.history = { ...this.history, closeBlock: blockStat };
        await this.bot.telegram.editMessageText(
          this.telegramOptions.channel_chatId,
          game.messageId,
          undefined,
          gameMessage(this.history, blockStat, this.betting, this.statistic),
          {
            ...GotoDashboardMenu(`tg://resolve?domain=${env.dashboard}`),
            parse_mode: 'HTML',
          }
        );
        this.logger.log(`CloseBlock[${blockNumber}]: Close Game`);
      } catch (e) {
        this.logger.error(`CloseBlock[${blockNumber}]: ${e.message}`);
      }
    }
    if (leftBlock <= 0) {
      try {
        const result: cnst.MixGameChoice = [
          parseInt(blockStat.blockHash.slice(-1), 16) > 7 ? 'HIGH' : 'LOW',
          parseInt(blockStat.blockHash.slice(-1), 16) % 2 === 0
            ? 'EVEN'
            : 'ODD',
        ];

        const pne = { win: 0, lose: 0 };
        if (this.test) {
          await this.bettingService.betting(
            this.random * this.telegramOptions.dashboardId,
            game,
            result[0]
          );

          this.test = false;
          this.random = 0;
        }
        const betting = await this.bettingService.currentBettingStatus(
          game._id
        );
        if (betting) {
          if (result[0] === 'HIGH') {
            pne.win = betting.amount.high;
            pne.lose = betting.amount.low;
          } else {
            pne.win = betting.amount.low;
            pne.lose = betting.amount.high;
          }
          if (result[1] === 'ODD') {
            pne.win = betting.amount.odd;
            pne.lose = betting.amount.even;
          } else {
            pne.win = betting.amount.even;
            pne.lose = betting.amount.odd;
          }
        }
        this.history = { ...this.history, ...pne, endBlock: blockStat, result };
        await this.historyService.writeHistory({
          ...this.history,
          gameId: game._id,
        });
        await this.bot.telegram.editMessageText(
          this.telegramOptions.channel_chatId,
          game.messageId,
          undefined,
          gameMessage(
            this.history,
            blockStat,
            this.betting,
            this.statistic,
            result
          ),
          {
            ...GotoDashboardMenu(`tg://resolve?domain=${env.dashboard}`),
            parse_mode: 'HTML',
          }
        );
        this.logger.log(`EndBlock[${blockNumber}]: Success to End Game`);
        await game.merge({ result, status: 'end' }).save();
        await this.completeGame(game);
      } catch (e) {
        this.test = false;
        this.logger.error(`EndBlock[${blockNumber}]: ${e.message}`);
      }
    }
  }

  async getGameByMessageId(messageId: number): Promise<Game.Doc> {
    const game = await this.Game.findOne({ messageId });
    if (!game) throw new Error('game not found');
    return game;
  }

  async clearGames(): Promise<any> {
    const completeGames = await this.Game.find({ status: 'complete' });
    for (const game of completeGames) {
      this.logger.log(`Delete Game(${game.messageId})`);
      await this.bettingService.deleteBettingsByGameId(game._id);
      await game.delete();
      await Utils.sleep(100);
    }
  }

  testGameService() {
    this.random = 2264;
    this.test = true;
  }

  async completeGame(game: Game.Doc): Promise<any> {
    this.logger.log(`Confirm Game(${game.messageId})`);
    this.completing = true;
    try {
      const bettings = await this.bettingService.getBettingsByGameId(game._id);
      if (bettings.length === 0)
        await game.merge({ status: 'complete' }).save();
      else {
        for (const betting of bettings) {
          try {
            const user = await this.userService.getUserById(betting.user);
            const profit = betting.amount * env.profitPercent[0];
            user?.chatId &&
              (await this.bot2.telegram.sendMessage(
                user.chatId,
                this.languageService.translateMessage(
                  user.language,
                  'gameResult',
                  betting,
                  user,
                  game.result,
                  profit
                ),
                {
                  ...this.languageService.goChannelButton(
                    user.language,
                    env.channel,
                    false
                  ),
                  parse_mode: 'HTML',
                }
              ));
            if (game.result.includes(betting.choice)) {
              await user.changePoint(profit).winGame().save();
            } else await user.loseGame().save();
            await betting.merge({ status: 'complete' }).save();
            await Utils.sleep(100);
          } catch (e) {
            this.logger.error(
              `Confirm Betting(${game.messageId}): ${e.message}`
            );
          }
        }
      }
    } catch (e) {
      this.logger.error(`Confirm Game(${game.messageId}): ${e.message}`);
      this.completing = false;
    }
  }

  async completeGames(): Promise<any> {
    const games = await this.Game.find({ status: 'end' }).sort({
      createdAt: -1,
    });
    for (const game of games) {
      this.logger.log(`Confirm Game(${game.messageId})`);
      try {
        const bettings = await this.bettingService.getBettingsByGameId(
          game._id
        );
        if (bettings.length === 0)
          await game.merge({ status: 'complete' }).save();
        else {
          for (const betting of bettings) {
            try {
              const user = await this.userService.getUserById(betting.user);
              const profit = betting.amount * env.profitPercent[0];
              user?.chatId &&
                (await this.bot2.telegram.sendMessage(
                  user.chatId,
                  postFix(gameResult(betting, user, game.result, profit)),
                  { parse_mode: 'HTML' }
                ));
              if (game.result.includes(betting.choice)) {
                await user.changePoint(profit).winGame().save();
              } else await user.loseGame().save();
              await betting.merge({ status: 'complete' }).save();
              await Utils.sleep(100);
            } catch (e) {
              this.logger.error(
                `Confirm Betting(${game.messageId}): ${e.message}`
              );
            }
          }
        }
      } catch (e) {
        this.logger.error(`Confirm Game(${game.messageId}): ${e.message}`);
      }
    }
  }

  async terminateGames(curBlock: number): Promise<any> {
    const games = await this.Game.find({
      $or: [{ status: 'close' }, { status: 'ing' }],
    });
    for (const game of games) {
      if (game.targetBlock > curBlock) continue;
      const result: cnst.MixGameChoice = [
        parseInt((await this.getBlockHash(game.targetBlock)).slice(-1), 16) > 7
          ? 'HIGH'
          : 'LOW',
        parseInt((await this.getBlockHash(game.targetBlock)).slice(-1), 16) %
          2 ===
        0
          ? 'EVEN'
          : 'ODD',
      ];

      this.logger.log(`Terminate Game(${game.messageId})`);
      await game.merge({ result, status: 'end' }).save();
      await Utils.sleep(100);
    }
  }
}
