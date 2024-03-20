import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const chatRoomInput = (): gql.ChatRoomInput => ({} as any);

export const createChatRoom = async (app: TestingModule) => {
  const chatRoomService = app.get<srv.ChatRoomService>(srv.ChatRoomService);
  const chatRoom = await chatRoomService.create(chatRoomInput());
  return chatRoom;
};
