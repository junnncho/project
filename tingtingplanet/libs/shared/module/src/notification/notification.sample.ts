import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const notificationInput = (): gql.NotificationInput => ({} as any);

export const createNotification = async (app: TestingModule) => {
  const notificationService = app.get<srv.NotificationService>(srv.NotificationService);
  const notification = await notificationService.create(notificationInput());
  return notification;
};
