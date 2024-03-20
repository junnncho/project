import * as Notification from "./notification.model";
import * as gql from "../gql";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { LoadService } from "@shared/util-server";

@Injectable()
export class NotificationService extends LoadService<Notification.Mdl, Notification.Doc, Notification.Input> {
  constructor(
    @InjectModel(Notification.name)
    private readonly Notification: Notification.Mdl
  ) {
    super(NotificationService.name, Notification);
  }
  async summarize(): Promise<gql.NotificationSummary> {
    return {
      totalNotification: await this.Notification.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }
}
