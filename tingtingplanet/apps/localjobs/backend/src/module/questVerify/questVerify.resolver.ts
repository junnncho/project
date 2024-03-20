import * as gql from "../gql";
import * as srv from "../srv";
import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { Args, ID, Int, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestVerifyService } from "./questVerify.service";
import { Logger, UseGuards } from "@nestjs/common";
import { gql as shared } from "@shared/module";
import { ChatBoard } from "libs/social/module/src/db";

@Resolver(() => gql.QuestVerify)
export class QuestVerifyResolver extends BaseResolver(
  gql.QuestVerify,
  gql.QuestVerifyInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(
    private readonly questVerifyService: QuestVerifyService,
    private readonly fileService: srv.shared.FileService,
    private readonly userService: srv.UserService,
    private readonly chatBoardService: srv.social.ChatBoardService,
    private readonly questService: srv.QuestService
  ) {
    super(questVerifyService);
  }
  @Mutation(() => [gql.shared.File])
  @UseGuards(Allow.Every)
  async addQuestVerifyFiles(
    @Args({ name: "files", type: () => [gql.shared.FileUpload] })
    files: gql.shared.FileUpload[],
    @Args({ name: "questVerifyId", type: () => ID, nullable: true })
    questVerifyId?: string
  ) {
    Logger.debug(`custom-resolver:addQuestVerifyFiles: input{questVerify:${questVerifyId}}`);
    return await this.fileService.addFiles(files, "questVerifyFiles", questVerifyId);
  }

  @Mutation(() => gql.QuestVerify)
  @UseGuards(Allow.User)
  async approveQuestVerify(
    @Args({ name: "questVerifyId", type: () => ID }) questVerifyId: string,
    @RequiredAuth() account: Account
  ) {
    Logger.debug(`custom-resolver:approveQuestVerify: input{questVerify:${questVerifyId}}`);
    const admin = await this.userService.load(account._id);
    !admin && new Error("admin not found.");
    !admin?.roles.includes("admin") && new Error("not allowed.");
    const questVerify = await this.questVerifyService.load(new Id(questVerifyId));
    const user = await this.userService.load(questVerify?.user);
    !user && new Error("admin not found.");
    const quest = await this.questService.load(questVerify?.quest);
    quest ?? new Error("quest not found.");
    await user?.getPoint(quest?.point || 0).save();
    return await questVerify?.merge({ status: "completed" }).save();
  }

  @Mutation(() => gql.QuestVerify)
  @UseGuards(Allow.User)
  async unApproveQuestVerify(
    @Args({ name: "questVerifyId", type: () => ID }) questVerifyId: string,
    @RequiredAuth() account: Account
  ) {
    Logger.debug(`custom-resolver:unApproveQuestVerify: input{questVerify:${questVerifyId}}`);
    const user = await this.userService.load(account._id);
    !user?.roles.includes("admin") && new Error("not allowed.");
    const questVerify = await this.questVerifyService.load(new Id(questVerifyId));
    await questVerify?.merge({ status: "rejected" }).save();
    return await questVerify?.merge({ status: "rejected" }).save();
  }

  @ResolveField(() => gql.shared.User)
  async user(@Parent() questVerify: gql.QuestVerify) {
    return await this.userService.load(questVerify.user);
  }

  @ResolveField(() => gql.Quest)
  async quest(@Parent() questVerify: gql.QuestVerify) {
    return await this.questService.load(questVerify.quest);
  }

  @ResolveField(() => [shared.File])
  async images(@Parent() questVerify: gql.QuestVerify) {
    return await this.fileService.loadMany(questVerify.images || []);
  }
}
