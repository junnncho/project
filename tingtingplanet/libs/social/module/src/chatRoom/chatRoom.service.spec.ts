import { ChatRoomService } from "./chatRoom.service";
import { TestSystem } from "@shared/test-server";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("ChatRoom Service", () => {
  const system = new TestSystem();
  let chatRoomService: ChatRoomService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    chatRoomService = app.get<ChatRoomService>(ChatRoomService);
  });
  afterAll(async () => await system.terminate());
  let chatRoom: db.ChatRoom.Doc;

  let input: gql.ChatRoomInput;
  it("Create ChatRoom", async () => {
    input = sample.chatRoomInput();
    chatRoom = await chatRoomService.create(input);
    expect(chatRoom.status).toEqual("active");
  });
  it("Update ChatRoom", async () => {
    input = sample.chatRoomInput();
    chatRoom = await chatRoomService.update(chatRoom._id, input);
  });
  it("Remove ChatRoom", async () => {
    chatRoom = await chatRoomService.remove(chatRoom._id);
    expect(chatRoom.status).toEqual("inactive");
  });
});
