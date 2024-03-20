import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { LogService } from "@shared/util-server";
// import { SummaryService } from "../summary/summary.service";

@Injectable()
export class PushService extends LogService {
  private readonly expo: Expo;
  constructor(@Inject("EXPO_OPTIONS") private readonly key: string) {
    super(PushService.name);
    this.expo = new Expo({
      accessToken: key,
    });
  }
  async sendNotification(data: ExpoPushMessage) {
    Logger.debug(`pushService:sendNotification: input{data:${JSON.stringify(data)}}`);
    const chunks = this.expo.chunkPushNotifications([{ ...data, sound: "default" }]);
    const tickets: ExpoPushTicket[] = [];
    for (const chunk of chunks) {
      try {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
    let response = "";
    for (const ticket of tickets) {
      if (ticket.status === "error") {
        if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
          response = "DeviceNotRegistered";
        }
      }
      if (ticket.status === "ok") {
        response = ticket.id;
      }
    }
    return response;
  }
}
