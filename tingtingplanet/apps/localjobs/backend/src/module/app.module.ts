import * as module from "./module";
import * as option from "./option";
import { DynamicModule, Global, Module } from "@nestjs/common";
@Global()
@Module({})
export class AppModule {
  static register(options: option.ModulesOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [...module.registerModules(options)],
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
      imports: [...module.registerModules(options), ...module.registerBatches(options)],
      controllers: [],
      providers: [],
    };
  }
}
