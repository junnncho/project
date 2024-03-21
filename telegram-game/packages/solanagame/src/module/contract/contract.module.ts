import { Global, Module, DynamicModule, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesOptions } from '../option';

import { ContractService } from './contract.service';

@Global()
@Module({})
export class ContractModule {
  static register(option: ModulesOptions): DynamicModule {
    return {
      module: ContractModule,
      providers: [
        { provide: 'SOLANA_OPTIONS', useValue: option.solana },
        ContractService,
      ],
      exports: [ContractService],
    };
  }
}
