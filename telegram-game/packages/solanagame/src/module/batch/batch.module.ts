import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { option } from '..';

import { ModulesOptions } from '../option';
import { BatchService } from './batch.service';

@Global()
@Module({})
export class BatchModule {
  static register(option: ModulesOptions): DynamicModule {
    return {
      module: BatchModule,
      providers: [
        { provide: 'TELEGRAM_OPTIONS', useValue: option.telegram },
        { provide: 'ETHER_OPTIONS', useValue: option.ethereum },
        BatchService,
      ],
      exports: [BatchService],
    };
  }
}
