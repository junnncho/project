import { BullModule } from "@nestjs/bull";
import { CloudflareModule } from "./cloudflare/cloudflare.module";
import { CommonModule } from "./common/common.module";
import { DiscordModule } from "./discord/discord.module";
import { DynamicModule } from "@nestjs/common";
import { IpfsModule } from "./ipfs/ipfs.module";
import { MailerModule } from "./mailer/mailer.module";
import { MessageModule } from "./message/message.module";
import { ModulesOptions } from "./option";
import { S3Module } from "./s3/s3.module";
import { ScalarModule } from "./_scalar/scalar.module";

export const registerModules = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    BullModule.forRoot({
      redis: { host: options.redis.host, port: options.redis.port },
    }),
    ScalarModule,
    CommonModule.register(options.redis),
    CloudflareModule.register(options.cloudflare),
    DiscordModule.register(options.discord),
    IpfsModule.register(options.ipfs),
    MailerModule.register(options.mailer),
    MessageModule.register(options.message),
    S3Module.register(options.objectStorage),
  ] as DynamicModule[];
  return modules;
};

export const registerBatches = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    //
  ] as DynamicModule[];
  return modules;
};
