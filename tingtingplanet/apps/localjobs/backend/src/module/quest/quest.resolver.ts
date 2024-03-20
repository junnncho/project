import * as gql from "../gql";
import * as srv from "../srv";
import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { Args, ID, Int, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestService } from "./quest.service";
import { Logger, UseGuards } from "@nestjs/common";
import { gql as shared } from "@shared/module";
import { ChatBoard } from "libs/social/module/src/db";

@Resolver(() => gql.Quest)
export class QuestResolver extends BaseResolver(gql.Quest, gql.QuestInput, Allow.Every, Allow.Every, Allow.Every) {
  constructor(
    private readonly questService: QuestService,
    private readonly fileService: srv.shared.FileService,
    private readonly userService: srv.shared.UserService,
    private readonly chatBoardService: srv.social.ChatBoardService
  ) {
    super(questService);
  }
  @Mutation(() => [gql.shared.File])
  @UseGuards(Allow.Every)
  async addQuestFiles(
    @Args({ name: "files", type: () => [gql.shared.FileUpload] })
    files: gql.shared.FileUpload[],
    @Args({ name: "questId", type: () => ID, nullable: true })
    questId?: string
  ) {
    Logger.debug(`custom-resolver:addQuestFiles: input{quest:${questId}}`);
    return await this.fileService.addFiles(files, "questFiles", questId);
  }

  // @Mutation(() => gql.Quest)
  // @UseGuards(Allow.User)
  // async applyQuest(@Args({ name: "questId", type: () => ID }) questId: string, @RequiredAuth() account: Account) {
  //   Logger.debug(`custom-resolver:applyQuest: input{quest:${questId} user:${account._id.toString()}}`);
  //   return await this.questService.applyQuest(new Id(questId), account._id);
  // }

  @ResolveField(() => [shared.File])
  async thumbnails(@Parent() quest: gql.Quest) {
    return await this.fileService.loadMany(quest.thumbnails || []);
  }
}
