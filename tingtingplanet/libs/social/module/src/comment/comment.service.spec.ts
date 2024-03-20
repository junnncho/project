import { CommentService } from "./comment.service";
import { TestSystem } from "@shared/test-server";
import { environment } from "../_environments/environment";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("Comment Service", () => {
  const system = new TestSystem();
  let commentService: CommentService;
  let board: db.Board.Doc;
  let story: db.Story.Doc;
  let network: db.shared.Network.Doc;
  let user: db.User.Doc;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    commentService = app.get<CommentService>(CommentService);
    network = await sample.shared.createNetwork(app, "klaytn");
    [user] = await sample.createUser(app, network._id, environment.klaytn.root.address);
    board = await sample.createBoard(app);
    story = await sample.createStory(app, board._id, user._id);
  });
  afterAll(async () => await system.terminate());
  let comment: db.Comment.Doc;
  let input: gql.CommentInput;
  it("Create Comment", async () => {
    input = sample.commentInput(story._id, user._id);
    comment = await commentService.create(input);
    expect(comment.status).toEqual("active");
    expect(comment).toEqual(expect.objectContaining(input));
  });
  it("Update Comment", async () => {
    input = sample.commentInput(story._id, user._id);
    comment = await commentService.update(comment._id, input);
    expect(comment).toEqual(expect.objectContaining(input));
  });
  it("Remove Comment", async () => {
    comment = await commentService.remove(comment._id);
    expect(comment.status).toEqual("inactive");
  });
});
