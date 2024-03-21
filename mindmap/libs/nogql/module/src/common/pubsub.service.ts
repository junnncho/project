import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { LogService } from '@nogql/util-server';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class PubsubService extends LogService implements OnModuleDestroy {
  constructor(@Inject('PUB_SUB') readonly pubsub: RedisPubSub) {
    super(PubsubService.name);
  }
  ping() {
    return this.publish('ping', { device: 1 });
  }
  publish<T = any>(topic: string, data: T) {
    return this.pubsub.publish(topic, { [topic]: data });
  }
  publishMany<T = any>(topic: string, data: T[]) {
    return data.forEach((dat) => this.publish<T>(topic, dat));
  }
  subscribe(topic: string) {
    return this.pubsub.asyncIterator(topic);
  }
  filter() {
    return true;
  }
  async onModuleDestroy() {
    await this.pubsub.close();
  }
}
