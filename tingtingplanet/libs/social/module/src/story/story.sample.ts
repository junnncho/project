import * as Chance from "chance";
import * as gql from "../gql";
import { Id } from "@shared/util-server";
import { StoryService } from "./story.service";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const storyInput = (boardId: Id, userId: Id): gql.StoryInput => ({
  root: boardId,
  rootType: "board",
  type: "user",
  user: userId,
  // admin?: Id;
  title: c.sentence(),
  content: c.sentence(),
  thumbnails: [],
  // logo?: Id;
  policy: [],
  images: [],
});
export const createStory = async (app: TestingModule, boardId: Id, userId: Id) => {
  const storyService = app.get<StoryService>(StoryService);
  const story = await storyService.create(storyInput(boardId, userId));
  return story;
};
