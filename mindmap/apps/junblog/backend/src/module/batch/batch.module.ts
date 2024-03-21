import { DynamicModule, Global, Module } from "@nestjs/common";

import { BatchService } from "./batch.service";
import { ModulesOptions } from "../option";

@Global()
@Module({})
export class BatchModule {
  static register(option: ModulesOptions): DynamicModule {
    return {
      module: BatchModule,
      providers: [BatchService],
      exports: [BatchService],
    };
  }
}
