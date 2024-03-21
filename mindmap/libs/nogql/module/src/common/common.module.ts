import { CommonResolver } from './common.resolver';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { PubsubService } from './pubsub.service';
import { RedisOptions } from '@nogql/util-server';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
@Global()
@Module({})
export class CommonModule {
  static register(option: RedisOptions): DynamicModule {
    return {
      module: CommonModule,
      imports: [],
      providers: [
        {
          provide: 'PUB_SUB',
          useFactory: () => {
            const options = { host: option.host, port: option.port };
            return new RedisPubSub({
              publisher: new Redis(options) as any,
              subscriber: new Redis(options) as any,
            });
          },
        },
        PubsubService,
        CommonResolver,
      ],
      exports: [PubsubService],
    };
  }
}
