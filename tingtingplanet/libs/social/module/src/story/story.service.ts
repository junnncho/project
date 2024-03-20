import * as Story from "./story.model";
import * as gql from "../gql";
import { ActionLogService } from "../actionLog/actionLog.service";
import { BoardService } from "../board/board.service";
import { Id, LoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { Utils } from "@shared/util";

@Injectable()
export class StoryService extends LoadService<Story.Mdl, Story.Doc, Story.Input> {
  constructor(
    @InjectModel(Story.name)
    private readonly Story: Story.Mdl,
    private readonly boardService: BoardService,
    private readonly userService: UserService,
    private readonly actionLogService: ActionLogService
  ) {
    super(StoryService.name, Story);
  }
  override async create(data: Story.Input) {
    if (data.rootType !== "board") return await this.Story.create(data);
    const board = await this.boardService.get(data.root);
    const user = await this.userService.load(data.user);
    if (!board.isGranted(user)) throw new Error("Role is not Granted");
    return await this.Story.create(data);
  }
  override async update(storyId: Id, data: Story.Input) {
    const story = await this.Story.pickById(storyId);
    if (story.rootType !== "board") return await story.merge(data).save();
    const board = await this.boardService.get(story.root);
    const user = await this.userService.load(story.user);
    if (!board.isGranted(user)) throw new Error("Role is not Granted");
    return await story.merge(data).save();
  }
  async approve(storyId: Id) {
    const story = await this.Story.pickById(storyId);
    await this.Story.moveSummary(story.status, "approved");
    return await story.merge({ status: "approved" }).save();
  }
  async deny(storyId: Id) {
    const story = await this.Story.pickById(storyId);
    await this.Story.moveSummary(story.status, "denied");
    return await story.merge({ status: "denied" }).save();
  }
  async view(target: Id, user?: Id) {
    await this.Story.view(target);
    if (user)
      await this.actionLogService.add({
        type: "story",
        target,
        user,
        action: "view",
      });
  }
  async comment(target: Id, user?: Id) {
    await this.Story.comment(target);
    if (user)
      await this.actionLogService.add({
        type: "story",
        target,
        user,
        action: "comment",
      });
  }
  async like(target: Id, user: Id) {
    const prev = await this.actionLogService.set({ type: "story", target, user, action: "like" }, 1);
    return await this.Story.like(target, prev);
  }
  async resetLike(target: Id, user: Id) {
    const prev = await this.actionLogService.set({ type: "story", target, user, action: "like" }, 0);
    return await this.Story.resetLike(target, prev);
  }
  async unlike(target: Id, user: Id) {
    const prev = await this.actionLogService.set({ type: "story", target, user, action: "like" }, -1);
    return await this.Story.unlike(target, prev);
  }
  async summarize(): Promise<gql.StorySummary> {
    return {
      totalStory: await this.Story.countDocuments({
        status: { $ne: "inactive" },
      }),
      activeStory: await this.Story.countDocuments({ status: "active" }),
      approvedStory: await this.Story.countDocuments({ status: "approved" }),
      deniedStory: await this.Story.countDocuments({ status: "denied" }),
      haStory: await this.Story.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastHour() },
      }),
      daStory: await this.Story.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastDays() },
      }),
      waStory: await this.Story.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastWeeks() },
      }),
      maStory: await this.Story.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastMonths() },
      }),
    };
  }
}
