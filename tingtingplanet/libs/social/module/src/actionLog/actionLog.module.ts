import * as ActionLog from "./actionLog.model";
import { ActionLogResolver } from "./actionLog.resolver";
import { ActionLogService } from "./actionLog.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: ActionLog.name, useFactory: ActionLog.middleware() }])],
  providers: [ActionLogService, ActionLogResolver],
  exports: [ActionLogService],
})
export class ActionLogModule {}
