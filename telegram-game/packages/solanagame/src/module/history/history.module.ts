import { Global, Module, DynamicModule, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as History from './history.model';

import { HistoryService } from './history.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: History.name, useFactory: History.middleware() },
    ]),
  ],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
