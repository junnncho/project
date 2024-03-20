import { DynamicModule, Global, Module } from "@nestjs/common";
import { ObjectStorageOptions } from "../option";
import { S3Service } from "./s3.service";
@Global()
@Module({})
export class S3Module {
  static register(options?: ObjectStorageOptions): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: "OBJECT_STORAGE_OPTIONS",
          useValue: options,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }
}
