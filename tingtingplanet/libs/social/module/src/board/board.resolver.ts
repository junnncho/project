import * as gql from "../gql";
import { Allow, BaseResolver } from "@shared/util-server";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { BoardService } from "./board.service";
import { UseGuards } from "@nestjs/common";

@Resolver(() => gql.Board)
export class BoardResolver extends BaseResolver(gql.Board, gql.BoardInput, Allow.Public, Allow.Public, Allow.Public) {
  constructor(private readonly boardService: BoardService) {
    super(boardService);
  }
  @Mutation(() => [gql.shared.File])
  @UseGuards(Allow.Every)
  async addBoardFiles(
    @Args({ name: "files", type: () => [gql.shared.FileUpload] })
    files: gql.shared.FileUpload[],
    @Args({ name: "boardId", type: () => String, nullable: true })
    boardId?: string
  ) {
    return await this.fileService.addFiles(files, "board", boardId);
  }
}
