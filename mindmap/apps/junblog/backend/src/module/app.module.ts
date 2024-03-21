import * as option from './option';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { registerBatches, registerModules } from './module';

@Global()
@Module({})
export class FederationAppModule {
  static register(options: option.ModulesOptions): DynamicModule {
    return {
      module: FederationAppModule,
      imports: [...registerModules(options)],
      controllers: [],
      providers: [], 
    };
  }
}

@Global()
@Module({})
export class BatchAppModule {
  static register(options: option.ModulesOptions): DynamicModule {
    return {
      module: BatchAppModule,
      imports: [...registerBatches(options)],
      controllers: [],
      providers: [],
    };
  }
}

@Global()
@Module({})
export class AllAppModule {
  static register(options: option.ModulesOptions): DynamicModule {
    return {
      module: AllAppModule,
      imports: [...registerBatches(options), ...registerModules(options)],
      controllers: [],
      providers: [],
    };
  }
}
