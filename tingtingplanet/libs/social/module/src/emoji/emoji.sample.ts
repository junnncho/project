import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { Id } from "@shared/util-server";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const emojiInput = (file: Id): gql.EmojiInput => ({
  name: c.name(),
  file,
});
export const createEmoji = async (app: TestingModule, fileId: Id) => {
  const emojiService = app.get<srv.EmojiService>(srv.EmojiService);
  const emoji = await emojiService.create(emojiInput(fileId));
  return emoji;
};
