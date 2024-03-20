import { DynamicModule, Global, Module } from "@nestjs/common";
import { MessageOptions } from "../option";
import { MessageService } from "./message.service";
//https://github.com/solapi/examples/blob/master/javascript
import { SolapiMessageService } from "solapi";

@Global()
@Module({})
export class MessageModule {
  static register(options: MessageOptions): DynamicModule {
    return {
      module: MessageModule,
      providers: [
        {
          provide: "MESSAGE_OPTIONS",
          useValue: options,
        },
        {
          provide: "MESSAGE",
          useValue: new SolapiMessageService(options.apiKey, options.apiSecret),
        },
        MessageService,
      ],
      exports: [MessageService],
    };
  }
}
