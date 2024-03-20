import * as Tour from "./tour.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TourResolver } from "./tour.resolver";
import { TourService } from "./tour.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Tour.name, useFactory: Tour.middleware() }])],
  providers: [TourService, TourResolver],
  exports: [TourService],
})
export class TourModule {}
