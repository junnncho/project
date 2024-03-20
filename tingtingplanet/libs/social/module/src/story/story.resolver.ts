import * as db from "../db";
import * as gql from "../gql";
import { Account, Allow, Auth, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { ActionLogService } from "../actionLog/actionLog.service";
import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { BoardService } from "../board/board.service";
import { StoryService } from "./story.service";
import { UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { srv as shared } from "@shared/module";
@Resolver(() => gql.Story)
export class StoryResolver extends BaseResolver(gql.Story, gql.StoryInput, Allow.Public, Allow.Public, Allow.Public) {
  constructor(
    private readonly storyService: StoryService,
    private readonly adminService: shared.AdminService,
    private readonly boardService: BoardService,
    private readonly fileService: shared.FileService,
    private readonly userService: UserService,
    private readonly actionLogService: ActionLogService
  ) {
    super(storyService);
  }
  @UseGuards(Allow.Public)
  @Query(() => gql.Story, { name: `getStory` })
  async get(@Args({ name: `storyId`, type: () => ID }) id: string, @Auth() account?: Account) {
    if (account?.role !== "admin") this.storyService.view(new Id(id), account?._id);
    return await this.storyService.get(new Id(id));
  }

  @Mutation(() => [gql.shared.File])
  @UseGuards(Allow.Every)
  async addStoryFiles(
    @Args({ name: "files", type: () => [gql.shared.FileUpload] })
    files: gql.shared.FileUpload[],
    @Args({ name: "storyId", type: () => ID, nullable: true }) storyId?: string
  ) {
    return await this.fileService.addFiles(files, "story", storyId);
  }
  @Mutation(() => gql.Story)
  @UseGuards(Allow.Admin)
  async approveStory(@Args({ name: "storyId", type: () => ID }) storyId: string) {
    return await this.storyService.approve(new Id(storyId));
  }

  @Mutation(() => gql.Story)
  @UseGuards(Allow.Admin)
  async denyStory(@Args({ name: "storyId", type: () => ID }) storyId: string) {
    return await this.storyService.deny(new Id(storyId));
  }
  @Mutation(() => Boolean)
  @UseGuards(Allow.User)
  async likeStory(@Args({ name: "storyId", type: () => ID }) storyId: string, @RequiredAuth() account: Account) {
    return await this.storyService.like(new Id(storyId), account._id);
  }
  @Mutation(() => Boolean)
  @UseGuards(Allow.User)
  async resetLikeStory(@Args({ name: "storyId", type: () => ID }) storyId: string, @RequiredAuth() account: Account) {
    return await this.storyService.resetLike(new Id(storyId), account._id);
  }
  @Mutation(() => Boolean)
  @UseGuards(Allow.User)
  async unlikeStory(@Args({ name: "storyId", type: () => ID }) storyId: string, @RequiredAuth() account: Account) {
    return await this.storyService.unlike(new Id(storyId), account._id);
  }
  @ResolveField(() => gql.shared.User)
  async user(@Parent() story: gql.Story) {
    return await this.userService.load(story.user);
  }
  @ResolveField(() => [gql.shared.File])
  async thumbnails(@Parent() story: gql.Story) {
    return await this.fileService.loadMany(story.thumbnails);
  }
  @ResolveField(() => gql.shared.File)
  async logo(@Parent() story: gql.Story) {
    return await this.fileService.load(story.logo);
  }
  @ResolveField(() => [gql.shared.File])
  async images(@Parent() story: gql.Story) {
    return await this.fileService.loadMany(story.images);
  }
  @ResolveField(() => Int)
  async view(@Parent() story: db.Story.Doc, @Auth() account?: Account) {
    return account?.role === "user"
      ? (
          await this.actionLogService.queryLoad({
            action: "view",
            target: story._id,
            user: account._id,
          })
        )?.value ?? 0
      : 0;
  }
  @ResolveField(() => Int)
  async like(@Parent() story: db.Story.Doc, @Auth() account?: Account) {
    return account?.role === "user"
      ? (
          await this.actionLogService.queryLoad({
            action: "like",
            target: story._id,
            user: account._id,
          })
        )?.value ?? 0
      : 0;
  }
}
