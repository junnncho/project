import * as Chance from "chance";
import * as gql from "../gql";
import { CommentService } from "./comment.service";
import { Id } from "@shared/util-server";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const commentInput = (storyId: Id, userId: Id, commentId?: Id): gql.CommentInput => ({
  root: storyId,
  rootType: "story",
  type: "user",
  user: userId,
  // admin?: Id;
  // name?: string;
  // phone?: string;
  // email?: string;
  content: c.sentence(),
  policy: [],
});
export const createComment = async (app: TestingModule, storyId: Id, userId: Id) => {
  const commentService = app.get<CommentService>(CommentService);
  const comment = await commentService.create(commentInput(storyId, userId));
  return comment;
};
