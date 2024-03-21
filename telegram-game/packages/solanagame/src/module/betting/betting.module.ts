import { Global, Module, DynamicModule, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from '../game/game.module';
import * as Betting from './betting.model';

import { BettingService } from './betting.service';

@Global()
@Module({
  imports: [
    // forwardRef(() => GameModule),
    MongooseModule.forFeatureAsync([
      { name: Betting.name, useFactory: Betting.middleware() },
    ]),
  ],
  providers: [BettingService],
  exports: [BettingService],
})
export class BettingModule {}
