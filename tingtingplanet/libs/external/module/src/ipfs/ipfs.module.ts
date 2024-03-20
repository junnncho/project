import { DynamicModule, Global, Module } from "@nestjs/common";
import { IpfsOptions } from "../option";
import { IpfsService } from "./ipfs.service";
@Global()
@Module({})
export class IpfsModule {
  static register(options?: IpfsOptions): DynamicModule {
    return {
      module: IpfsModule,
      providers: [{ provide: "IPFS_OPTIONS", useValue: options }, IpfsService],
      exports: [IpfsService],
    };
  }
}
