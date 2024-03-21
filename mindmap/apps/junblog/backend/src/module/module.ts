import { ApiModule } from './api/api.module';
import { BatchModule } from './batch/batch.module';
import { ContractModule } from './contract/contract.module';
import { DynamicModule } from '@nestjs/common';
import { ModulesOptions } from './option';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SpecialReferralModule } from './specialReferral/specialReferral.module';
import { UserModule } from './user/user.module';
import { FlowModule } from './flow/flow.module';
import { VideoViewModule } from './videoView/videoView.module';
import { WaitingModule } from './waiting/waiting.module';
import { module as nogql } from '@nogql/module';
// import { EdgeModule } from './edge/edge.module';
import { TextModule } from './text/text.module';
import { DrawModule } from './draw/draw.module';

export const registerModules = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: options.mongo.uri,
        dbName: options.mongo.dbName,
        autoIndex: options.environment.env !== 'main',
      }),
    }),
    UserModule,
    FlowModule,
    // EdgeModule,
    TextModule,
    DrawModule.register(options.environment),
    VideoViewModule,
    ApiModule,
    WaitingModule,
    ContractModule.register(options),
    SpecialReferralModule,

    ...nogql.registerModules(options, true),
  ].filter((module) => !!module) as DynamicModule[];
  return modules;
};
export const registerBatches = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: options.mongo.uri,
        dbName: options.mongo.dbName,
        autoIndex: options.environment.env !== 'main',
      }),
    }),
    UserModule,
    FlowModule,
    // EdgeModule,
    TextModule,
    DrawModule.register(options.environment),
    VideoViewModule,
    ApiModule,
    WaitingModule,
    ContractModule.register(options),
    SpecialReferralModule,
    ...nogql.registerBatches(options, true),
    BatchModule.register(options),
  ].filter((module) => !!module) as DynamicModule[];
  return modules;
};
