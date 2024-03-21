import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { Utils } from '@shared/util';
import { InjectBot } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { EthereumOptions, TelegramOptions } from '../option';
import { ethers } from 'ethers';
import { BettingMenu } from '../game/game.front';
import { GameService } from '../game/game.service';
import { BettingService } from '../betting/betting.service';
import { HistoryService } from '../history/history.service';
import { BlockStat } from '../history/history.model';
import { LogService } from '@shared/util-server';
import { WithdrawListService } from '../waiting/waiting.service';
import WebSocket from 'ws';
@Injectable()
export class BatchService
  extends LogService
  implements OnModuleInit, OnModuleDestroy
{
  // provider: ethers.providers.EtherscanProvider;
  ws: ethers.providers.WebSocketProvider;
  block: number;
  constructor(
    // @InjectBot('batch-bot') private readonly bot: Telegraf<Scenes.SceneContext>,
    @Inject('ETHER_OPTIONS') private readonly etherOptions: EthereumOptions,
    // @Inject('TELEGRAM_OPTIONS')
    // private readonly telegramOptions: TelegramOptions,
    private readonly gameService: GameService,
    private readonly withdrawListService: WithdrawListService
  ) {
    super(BatchService.name);
  }
  onModuleInit() {
    this.ws = new ethers.providers.WebSocketProvider(
      this.etherOptions.infuraWsUrl,
      this.etherOptions.network
    );

    let pingTimeout: NodeJS.Timeout;
    let keepAliveInterval: NodeJS.Timer;

    this.ws._websocket.on('open', () => {
      keepAliveInterval = setInterval(() => {
        this.ws._websocket.ping();

        // Use `WebSocket#terminate()`, which immediately destroys the connection,
        // instead of `WebSocket#close()`, which waits for the close timer.
        // Delay should be equal to the interval at which your server
        // sends out pings plus a conservative assumption of the latency.
        pingTimeout = setTimeout(() => {
          this.ws._websocket.terminate();
        }, 15000);
      }, 7500);

      // TODO: handle contract listeners setup + indexing
    });

    this.ws._websocket.on('close', () => {
      this.logger.error('The websocket connection was closed');
      clearInterval(keepAliveInterval);
      clearTimeout(pingTimeout);
      this.onModuleInit();
    });

    this.ws._websocket.on('pong', () => {
      clearInterval(pingTimeout);
    });

    this.ws._websocket.on('error', async () => {
      this.logger.error('The websocket connection get error');
      this.ws.websocket.close();
    });
    this.ws.on('block', async (blockNumber) => {
      try {
        await this.gameCheck(blockNumber);
        this.block = blockNumber;
      } catch (e) {
        this.logger.error(e.message);
      }
    });
  }
  onModuleDestroy() {
    this.ws.destroy();
  }
  // @Cron('0 * * * *')
  // async cleanGames() {
  //   //! Temporary Code
  // }

  @Cron('*/15 * * * * *')
  async gameStart() {
    try {
      await this.gameService.startGame();
    } catch (e) {
      return;
    }
  }

  async gameCheck(blockNumber: number) {
    try {
      await this.gameService.getGame(blockNumber);
    } catch (e) {
      this.logger.log(`any Game(gameCheck):${e.message}`);
    }
  }

  @Cron('0 0 0 * * *')
  async gameSummary() {
    this.logger.log('gameSummary Start');
    await this.gameService.completeGames();
    this.logger.log('gameSummary End');
    //! Temporary Code
  }

  @Cron('0 5 */3 * * *')
  async cleanGames() {
    this.logger.log('cleanGames Start');
    await this.gameService.clearGames();
    this.logger.log('cleanGames End');
  }

  @Cron('0 10 */30 * * *')
  async terminateGames() {
    this.logger.log('terminateGames Start');
    await this.gameService.terminateGames(this.block);
    this.logger.log('terminateGames End');
  }

  @Cron('*/30 * * * * *')
  async withdrawLoop() {
    await this.withdrawListService.confirmWtihdrawList();
  }

  @Cron('0 0 */1 * * *')
  async cleanWitdrawList() {
    this.logger.log('Cleaning withdrawList Start');
    await this.withdrawListService.cleanWithdrawList();
    this.logger.log('Cleaning withdrawList End');
  }
  //   @Cron('0 * * * *')
  //   async takePeriodicSnapshot() {
  //   }

  //   @Cron('0 * * * *')
  //   async takePeriodicContractSnapshot() {
  //   }
  //
}
