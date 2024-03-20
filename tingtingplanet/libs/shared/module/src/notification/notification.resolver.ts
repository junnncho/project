import * as gql from "../gql";
import { Allow, BaseResolver } from "@shared/util-server";
import { FileService } from "../file/file.service";
import { NotificationService } from "./notification.service";
import { Resolver } from "@nestjs/graphql";

@Resolver(() => gql.Notification)
export class NotificationResolver extends BaseResolver(
  gql.Notification,
  gql.NotificationInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(private readonly notificationService: NotificationService, private readonly fileService: FileService) {
    super(notificationService);
  }
}
