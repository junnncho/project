import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { ModulesOptions } from "./option";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { join } from "path";

// * Module Imports
import { AdminModule } from "./admin/admin.module";
import { CurrencyModule } from "./currency/currency.module";
import { DynamicModule } from "@nestjs/common";
import { FileModule } from "./file/file.module";
import { KeyringModule } from "./keyring/keyring.module";
import { NotificationModule } from "./notification/notification.module";
import { ProductModule } from "./product/product.module";
import { ScalarModule } from "./_scalar/scalar.module";
import { SecurityModule } from "./security/security.module";
import { SecurityService } from "./security/security.service";
import { SharedBatchModule } from "./sharedBatch/sharedBatch.module";
import { SummaryModule } from "./summary/summary.module";
import { ThingModule } from "./thing/thing.module";
import { UserModule } from "./user/user.module";
import { module as external } from "@external/module";
export const registerModules = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    ...external.registerModules(options, true),
    ScheduleModule.forRoot(),
    SecurityModule.register(options.security),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [],
      useFactory: async (securityService: SecurityService) => ({
        useGlobalPrefix: true,
        autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        sortSchema: true,
        playground: options.environment.env !== "main",
        uploads: false,
        debug: false,
        context: async ({ req, connection }) => {
          const account = securityService.verifyToken(req?.headers?.authorization);
          return {
            ...req,
            account,
            geolocation: req?.headers?.geolocation,
            userAgent: req?.headers?.["user-agent"],
          };
        },
        subscriptions: {
          "subscriptions-transport-ws": {
            onConnect: async (ctx: any) => {
              // service.summarizer.incrementData("activeUsers");
              // const { account } = await Authorization.verifyToken(authorization);
              // if (account?._id && account?.role === "user") service.clubMan.publishOnline(account);
              // Object.assign(context, { account });
              // return { account };
            },
            onDisconnect: async (webSocket: any, { account }: any) => {
              // service.summarizer.incrementData("activeUsers", -1);
              // if (account?._id && account?.role === "user") service.clubMan.publishOffline(account);
            },
          },
        },
      }),
      driver: ApolloDriver,
      inject: [SecurityService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: options.mongo.uri,
        dbName: options.mongo.dbName,
        autoIndex: options.environment.env !== "main",
      }),
    }),
    FileModule,
    KeyringModule.register(options.security, options.environment),
    AdminModule.register(options.security),
    NotificationModule,
    ScalarModule,
    ThingModule,
    ProductModule,
    CurrencyModule,
    SummaryModule.register(!isChild),
    UserModule.register(!isChild),
  ] as DynamicModule[];
  return modules;
};
export const registerBatches = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    SharedBatchModule as unknown as DynamicModule,
    //
  ] as DynamicModule[];
  return modules;
};
