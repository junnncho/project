import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const chatBoardInput = (): gql.ChatBoardInput => ({} as any);

export const createChatBoard = async (app: TestingModule) => {
  const chatBoardService = app.get<srv.ChatBoardService>(srv.ChatBoardService);
  const chatBoard = await chatBoardService.create(chatBoardInput());
  return chatBoard;
};
