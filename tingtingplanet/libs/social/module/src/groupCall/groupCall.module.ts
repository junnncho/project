import * as GroupCall from "./groupCall.model";
import { Global, Module } from "@nestjs/common";
import { GroupCallGateway } from "./groupCall.gateway";
import { GroupCallResolver } from "./groupCall.resolver";
import { GroupCallService } from "./groupCall.service";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: GroupCall.name, useFactory: GroupCall.middleware() }])],
  providers: [GroupCallService, GroupCallResolver, GroupCallGateway],
  exports: [GroupCallService],
})
export class GroupCallModule {}
