import * as Notification from "./notification.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationResolver } from "./notification.resolver";
import { NotificationService } from "./notification.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Notification.name, useFactory: Notification.middleware() }])],
  providers: [NotificationService, NotificationResolver],
  exports: [NotificationService],
})
export class NotificationModule {}
