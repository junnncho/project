// import { BullModule } from "@nestjs/bull";
import { CloudflareModule } from "./cloudflare/cloudflare.module";
// import { CommonModule } from "./common/common.module";
import { DynamicModule } from "@nestjs/common";
import { FileModule } from "./file/file.module";
import { KeyringModule } from "./keyring/keyring.module";
import { MailerModule } from "./mailer/mailer.module";
import { MessageModule } from "./message/message.module";
import { ModulesOptions } from "./option";
import { MongooseModule } from "@nestjs/mongoose";
import { S3Module } from "./s3/s3.module";
import { ScalarModule } from "./_scalar/scalar.module";
import { SecurityModule } from "./security/security.module";
import { UserModule } from "./user/user.module";

export const registerModules = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    // BullModule.forRoot({
    //   redis: { host: options.redis.host, port: options.redis.port },
    // }),
    ScalarModule,
    // CommonModule.register(options.redis),
    SecurityModule.register(options.security),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: options.mongo.uri,
        dbName: options.mongo.dbName,
        autoIndex: options.environment.env !== "main",
      }),
    }),
    FileModule.register(options.environment),
    UserModule.register(!isChild),
    KeyringModule.register(options.security, options.environment),
    CloudflareModule.register(options.cloudflare),
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
