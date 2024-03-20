import { DiscordOptions } from "../option";
import { DiscordService } from "./discord.service";
import { DynamicModule, Global, Module } from "@nestjs/common";
import { WebhookClient } from "discord.js";
import { makeDiscordBots } from "@shared/util-server";
@Global()
@Module({
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {
  static register(options: DiscordOptions): DynamicModule {
    return {
      module: DiscordModule,
      providers: [
        {
          provide: "DISCORD_BOTS",
          useFactory: async () => {
            const bots = await makeDiscordBots(options.tokens);
            return bots;
          },
        },
        {
          provide: "DISCORD_WEBHOOK",
          useFactory: () => {
            return new WebhookClient({ url: options.webhook });
          },
        },
        DiscordService,
      ],
      exports: [DiscordService],
    };
  }
}
