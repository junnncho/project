import * as ServiceDesk from "./serviceDesk.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServiceDeskResolver } from "./serviceDesk.resolver";
import { ServiceDeskService } from "./serviceDesk.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: ServiceDesk.name, useFactory: ServiceDesk.middleware() }])],
  providers: [ServiceDeskService, ServiceDeskResolver],
  exports: [ServiceDeskService],
})
export class ServiceDeskModule {}
