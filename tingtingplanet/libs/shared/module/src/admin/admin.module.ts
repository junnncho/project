import * as Admin from "./admin.model";
import { AdminResolver } from "./admin.resolver";
import { AdminService } from "./admin.service";
import { DynamicModule, Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { option } from "@shared/module";

@Global()
@Module({})
export class AdminModule {
  static register(options: option.SecurityOptions): DynamicModule {
    return {
      module: AdminModule,
      imports: [MongooseModule.forFeatureAsync([{ name: Admin.name, useFactory: Admin.middleware(options) }])],
      providers: [{ provide: "SECURITY_OPTIONS", useValue: options }, AdminService, AdminResolver],
      exports: [AdminService],
    };
  }
}
