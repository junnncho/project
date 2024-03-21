import * as Edge from "./edge.model";
import { EdgeController } from "./edge.controller";
import { EdgeService } from "./edge.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Edge.name, useFactory: Edge.middleware() }])],
  controllers: [EdgeController],
  providers: [EdgeService],
  exports: [EdgeService],
})
export class EdgeModule {}
