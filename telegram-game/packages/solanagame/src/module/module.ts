import { ModulesOptions } from './option';
import { DynamicModule } from '@nestjs/common';
import { BatchModule } from './batch/batch.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import { RealTimeModule } from './realTime/realTime.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { session } from 'telegraf';
import { WaitingModule } from './waiting/waiting.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HistoryModule } from './history/history.module';
import { BettingModule } from './betting/betting.module';
import { defaultScene } from '../middlewares/defaultScene';
import { ContractModule } from './contract/contract.module';
import { LanguageModule } from './language/language.module';

export const registerModules = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    TelegrafModule.forRootAsync({
      botName: 'realtime-bot',
      useFactory: () => ({
        // launchOptions: {
        //   webhook: { port: options.port, domain: options.environment.origin },
        // },
        token: options.telegram.key1,
        middlewares: [session(), defaultScene],
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: options.mongo.uri,
        dbName: options.mongo.dbName,
        autoIndex: options.environment.env !== 'main',
      }),
    }),
    RealTimeModule,
    LanguageModule,
    HistoryModule,
    UserModule,
    WaitingModule,
    ContractModule.register(options),
  ].filter((module) => !!module) as DynamicModule[];
  return modules;
};
export const registerBatches = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    ScheduleModule.forRoot(),
    TelegrafModule.forRootAsync({
      botName: 'realtime-bot',
      useFactory: () => ({
        launchOptions: {
          webhook: { port: options.port, domain: options.environment.origin },
        },
        token: options.telegram.key1,
        middlewares: [session(), defaultScene],
      }),
    }),
    TelegrafModule.forRootAsync({
      botName: 'game-bot',
      useFactory: () => ({
        // launchOptions: {
        //   webhook: { port: options.port, domain: options.environment.origin },
        // },
        token: options.telegram.key2,
        middlewares: [session()],
        include: [GameModule],
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: options.mongo.uri,
        dbName: options.mongo.dbName,
        autoIndex: options.environment.env !== 'main',
      }),
    }),
    BatchModule.register(options),
    GameModule.register(options),
    ContractModule.register(options),
    LanguageModule,
    BettingModule,
    HistoryModule,
    UserModule,
    WaitingModule,
  ].filter((module) => !!module) as DynamicModule[];
  return modules;
};
