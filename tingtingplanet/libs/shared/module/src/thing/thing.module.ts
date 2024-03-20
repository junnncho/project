import * as Thing from "./thing.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ThingResolver } from "./thing.resolver";
import { ThingService } from "./thing.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Thing.name, useFactory: Thing.middleware() }])],
  providers: [ThingService, ThingResolver],
  exports: [ThingService],
})
export class ThingModule {}
