import * as ChatBoard from "./chatBoard.model";
import { ChatBoardGateWay } from "./chatBoard.gateway";
import { ChatBoardResolver } from "./chatBoard.resolver";
import { ChatBoardService } from "./chatBoard.service";
import { DynamicModule, Global, Module } from "@nestjs/common";
import { GatewaySessionManager } from "@shared/util-server";
import { ModulesOptions } from "../option";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({})
export class ChatBoardModule {
  static register(option: ModulesOptions): DynamicModule {
    return {
      module: ChatBoardModule,
      imports: [MongooseModule.forFeatureAsync([{ name: ChatBoard.name, useFactory: ChatBoard.middleware() }])],
      providers: [
        ChatBoardService,
        ChatBoardResolver,
        {
          provide: "GATEWAY_SESSION_MANAGER",
          useClass: GatewaySessionManager,
        },
        { provide: "REDIS_OPTIONS", useValue: option.redis },
        ChatBoardGateWay,
      ],
      exports: [
        ChatBoardService,
        {
          provide: "GATEWAY_SESSION_MANAGER",
          useClass: GatewaySessionManager,
        },
      ],
    };
  }
}
