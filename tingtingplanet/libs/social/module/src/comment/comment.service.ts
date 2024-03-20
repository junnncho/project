import * as Comment from "./comment.model";
import * as gql from "../gql";
import { ActionLogService } from "../actionLog/actionLog.service";
import { BoardService } from "../board/board.service";
import { Id, LoadConfig, LoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { StoryService } from "../story/story.service";
import { UserService } from "../user/user.service";
import { Utils } from "@shared/util";

@Injectable()
export class CommentService extends LoadService<Comment.Mdl, Comment.Doc, Comment.Input> {
  constructor(
    @InjectModel(Comment.name)
    private readonly Comment: Comment.Mdl,
    private readonly storyService: StoryService,
    private readonly boardService: BoardService,
    private readonly userService: UserService,
    private readonly actionLogService: ActionLogService
  ) {
    super(CommentService.name, Comment);
  }
  override async create(data: Comment.Input) {
    if (!(await this.checkGranted(data))) throw new Error("Role is not Granted");
    const comment = await new this.Comment(data).save();
    if (comment.rootType === "story") await this.storyService.comment(data.root, data.user);
    return await comment
      .merge({
        parentCreatedAt: (await this.Comment.findById(data.parent))?.parentCreatedAt ?? comment.createdAt,
      })
      .save();
  }
  override async update(commentId: Id, data: Comment.Input) {
    const comment = await this.Comment.pickById(commentId);
    if (!(await this.checkGranted(comment))) throw new Error("Role is not Granted");
    return await comment.merge(data).save();
  }
  override async remove(commentId: Id, { account }: LoadConfig<Comment.Doc> = {}) {
    const comment = await this.Comment.pickById(commentId);
    // const user = await this.userService.get(comment.user);
    // if (!account?._id.equals(comment.user) && !["admin", "root"].includes(user.role))
    //   throw new Error("Role is not Granted");
    return await comment.merge({ status: "removed" }).save();
  }
  async checkGranted(comment: Comment.Doc | Comment.Input) {
    if (comment.rootType !== "story") return true;
    const story = await this.storyService.get(comment.root);
    if (story.rootType !== "board") return true;
    const board = await this.boardService.get(story.root);
    const user = await this.userService.get(comment.user);
    return board.isGranted(user);
  }
  async approve(commentId: Id) {
    const comment = await this.Comment.pickById(commentId);
    await this.Comment.moveSummary(comment.status, "approved");
    return await comment.merge({ status: "approved" }).save();
  }
  async deny(commentId: Id) {
    const comment = await this.Comment.pickById(commentId);
    await this.Comment.moveSummary(comment.status, "denied");
    return await comment.merge({ status: "denied" }).save();
  }
  async like(target: Id, user: Id) {
    const prev = await this.actionLogService.set({ type: "comment", target, user, action: "like" }, 1);
    return await this.Comment.like(target, prev);
  }
  async resetLike(target: Id, user: Id) {
    const prev = await this.actionLogService.set({ type: "comment", target, user, action: "like" }, 0);
    return await this.Comment.resetLike(target, prev);
  }
  async unlike(target: Id, user: Id) {
    const prev = await this.actionLogService.set({ type: "comment", target, user, action: "like" }, -1);
    return await this.Comment.unlike(target, prev);
  }
  async summarize(): Promise<gql.CommentSummary> {
    return {
      totalComment: await this.Comment.countDocuments({
        status: { $ne: "inactive" },
      }),
      activeComment: await this.Comment.countDocuments({ status: "active" }),
      approvedComment: await this.Comment.countDocuments({
        status: "approved",
      }),
      deniedComment: await this.Comment.countDocuments({ status: "denied" }),
      haComment: await this.Comment.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastHour() },
      }),
      daComment: await this.Comment.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastDays() },
      }),
      waComment: await this.Comment.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastWeeks() },
      }),
      maComment: await this.Comment.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastMonths() },
      }),
    };
  }
}
