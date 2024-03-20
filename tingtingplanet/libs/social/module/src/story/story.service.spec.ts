import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { CommentService } from "../comment/comment.service";
import { StoryService } from "./story.service";
import { TestSystem } from "@shared/test-server";
import { environment } from "../_environments/environment";
import { registerModules } from "../module";

describe("Story Service", () => {
  const system = new TestSystem();
  let storyService: StoryService;
  let commentService: CommentService;
  let network: db.shared.Network.Doc;
  let user: db.User.Doc;
  let board: db.Board.Doc;
  let comment: db.Comment.Doc;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    storyService = app.get<StoryService>(StoryService);
    commentService = app.get<CommentService>(CommentService);
    network = await sample.shared.createNetwork(app, "klaytn");
    [user] = await sample.createUser(app, network._id, environment.klaytn.root.address);
    board = await sample.createBoard(app);
  });
  afterAll(async () => await system.terminate());
  let story: db.Story.Doc;
  let input: gql.StoryInput;
  it("Create Story", async () => {
    input = sample.storyInput(board._id, user._id);
    story = await storyService.create(input);
    expect(story.status).toEqual("active");
    expect(story.title).toEqual(input.title);
  });
  it("Update Story", async () => {
    input = sample.storyInput(board._id, user._id);
    story = await storyService.update(story._id, input);
    expect(story.status).toEqual("active");
    expect(story.title).toEqual(input.title);
  });
  it("Create comment with story", async () => {
    comment = await commentService.create(sample.commentInput(story._id, user._id));
    expect(comment.status).toEqual("active");
  });
  it("Create subComment with story", async () => {
    const subComment = await commentService.create(sample.commentInput(story._id, user._id, comment._id));
    expect(subComment.status).toEqual("active");
  });
  // it("Unable to create subComment in story with policy", async () => {
  //   await story.merge({ policy: ["noSubComment"] }).save();
  //   await expect(commentService.create(sample.commentInput(story._id, user._id, comment._id))).rejects.toThrow();
  // });
  // it("Unable to create comment in story with policy", async () => {
  //   await story.merge({ policy: ["noComment", "noSubComment"] }).save();
  //   await expect(commentService.create(sample.commentInput(story._id, user._id))).rejects.toThrow();
  // });
  it("Remove Story", async () => {
    story = await storyService.remove(story._id);
    expect(story.status).toEqual("inactive");
  });
  // it("Unable to create comment with removed story", async () => {
  //   await story.merge({ policy: [] }).save();
  //   await storyService.remove(story._id);
  //   await expect(commentService.create(sample.commentInput(story._id, user._id))).rejects.toThrow();
  // });
});
