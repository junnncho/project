import { Global, Module, DynamicModule, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as Game from './game.model';
import { GameService } from './game.service';
import { ModulesOptions } from '../option';
import { BettingModule } from '../betting/betting.module';
import { GameUpdate } from './game.update';

@Global()
@Module({})
export class GameModule {
  static register(option: ModulesOptions): DynamicModule {
    return {
      module: GameModule,
      imports: [
        // forwardRef(() => BettingModule),
        GameUpdate,
        MongooseModule.forFeatureAsync([
          { name: Game.name, useFactory: Game.middleware() },
        ]),
      ],
      providers: [
        { provide: 'TELEGRAM_OPTIONS', useValue: option.telegram },
        { provide: 'ETHER_OPTIONS', useValue: option.ethereum },
        GameService,
      ],
      exports: [GameService],
    };
  }
}
