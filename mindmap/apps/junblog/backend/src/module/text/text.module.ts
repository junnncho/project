import * as Text from "./text.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TextController } from "./text.controller";
import { TextService } from "./text.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Text.name, useFactory: Text.middleware() }])],
  controllers: [TextController],
  providers: [TextService],
  exports: [TextService],
})
export class TextModule {}
