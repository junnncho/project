import { ChatBoardService } from "./chatBoard.service";
import { TestSystem } from "@shared/test-server";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("ChatBoard Service", () => {
  const system = new TestSystem();
  let chatBoardService: ChatBoardService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    chatBoardService = app.get<ChatBoardService>(ChatBoardService);
  });
  afterAll(async () => await system.terminate());
  let chatBoard: db.ChatBoard.Doc;

  let input: gql.ChatBoardInput;
  it("Create ChatBoard", async () => {
    input = sample.chatBoardInput();
    chatBoard = await chatBoardService.create(input);
    expect(chatBoard.status).toEqual("active");
  });
  it("Update ChatBoard", async () => {
    input = sample.chatBoardInput();
    chatBoard = await chatBoardService.update(chatBoard._id, input);
  });
  it("Remove ChatBoard", async () => {
    chatBoard = await chatBoardService.remove(chatBoard._id);
    expect(chatBoard.status).toEqual("inactive");
  });
});
