import { DynamicModule, Global, Module } from "@nestjs/common";
import { SecurityOptions } from "../option";
import { SecurityService } from "./security.service";

@Global()
@Module({})
export class SecurityModule {
  static register(options?: SecurityOptions): DynamicModule {
    return {
      module: SecurityModule,
      providers: [{ provide: "SECURITY_OPTIONS", useValue: options }, SecurityService],
      exports: [SecurityService],
    };
  }
}
