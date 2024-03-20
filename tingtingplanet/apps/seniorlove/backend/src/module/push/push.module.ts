import { Global, Module, DynamicModule } from "@nestjs/common";
import { PushService } from "./push.service";
import { ModulesOptions } from "../option";

@Global()
@Module({})
export class PushModule {
  static register(option: ModulesOptions): DynamicModule {
    return {
      module: PushModule,
      providers: [{ provide: "EXPO_OPTIONS", useValue: option.expo }, PushService],
      exports: [PushService],
    };
  }
}
