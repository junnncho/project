import * as File from "./file.model";
import { FileService } from "./file.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: File.name, useFactory: File.middleware() }])],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
