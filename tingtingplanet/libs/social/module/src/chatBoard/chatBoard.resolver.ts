import * as gql from "../gql";
import * as srv from "../srv";
import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { Args, ID, Mutation, Parent, ResolveField, Resolver, Query } from "@nestjs/graphql";
import { ChatBoardService } from "./chatBoard.service";
import { ChatRoomService } from "../srv";
import { UseGuards } from "@nestjs/common";

@Resolver(() => gql.ChatBoard)
export class ChatBoardResolver extends BaseResolver(
  gql.ChatBoard,
  gql.ChatBoardInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(
    private readonly chatBoardService: ChatBoardService,
    private readonly chatRoomService: ChatRoomService,
    private readonly fileService: srv.shared.FileService
  ) {
    super(chatBoardService);
  }
  // create resolver 경우에는 create 서비스만 override 해줫으므로 기본 create 기능을 전제로 한 resolver 가 세팅되어있음
  // chat resolver 는 준이네 컴퓨터에 구현해둿으니 추가로 만들진 않겠음

  @Query(() => gql.ChatBoard, { name: `getChatBoard` })
  @UseGuards(Allow.User)
  async get(
    @Args({ name: `chatBoardId`, type: () => ID })
    id: string,
    @RequiredAuth() account: Account
  ) {
    return await this.chatBoardService.authGet(new Id(id), account._id);
  }

  @Mutation(() => String)
  @UseGuards(Allow.User)
  async generateChatBoard(
    @Args({ name: "userIds", type: () => [ID] }) userIds: string[],
    @RequiredAuth() account: Account,
    @Args({ name: "roomName", type: () => String }) name?: string
  ) {
    const Ids = userIds.map((user) => new Id(user));
    const newChatBoard = await this.chatBoardService.newChatBoard(Ids, name);
    return newChatBoard.id;
  }

  @Mutation(() => String)
  @UseGuards(Allow.User)
  async newChat(
    @Args({ name: "chatBoardId", type: () => ID }) chatBoardId: string,
    @Args({ name: "text", type: () => String }) text: string,
    @RequiredAuth() account: Account
  ) {
    return (await this.chatBoardService.newChat(account._id, new Id(chatBoardId), text)).id;
  }

  @Mutation(() => String)
  @UseGuards(Allow.User)
  async inviteChatBoard(
    @Args({ name: "chatBoardId", type: () => ID }) chatBoardId: string,
    @Args({ name: "userId", type: () => ID }) userId: string
  ) {
    return (await this.chatBoardService.joinChatBoard(new Id(userId), new Id(chatBoardId))).id;
  }

  @Mutation(() => String)
  @UseGuards(Allow.User)
  async joinChatBoard(
    @Args({ name: "chatBoardId", type: () => ID }) chatBoardId: string,
    @RequiredAuth() account: Account
  ) {
    return (await this.chatBoardService.joinChatBoard(account._id, new Id(chatBoardId))).id;
  }

  @Mutation(() => String)
  @UseGuards(Allow.User)
  async exitChatBoard(
    @Args({ name: "chatBoardId", type: () => ID }) chatBoardId: string,
    @RequiredAuth() account: Account
  ) {
    return (await this.chatBoardService.exitChatBoard(account._id, new Id(chatBoardId))).id;
  }

  @Mutation(() => String)
  @UseGuards(Allow.User)
  async kickChatBoard(
    @Args({ name: "chatBoardId", type: () => ID }) chatBoardId: string,
    @Args({ name: "userId", type: () => ID }) userId: string
  ) {
    return (await this.chatBoardService.exitChatBoard(new Id(userId), new Id(chatBoardId))).id;
  }

  @ResolveField(() => gql.ChatBoard)
  async recentRoom(@Parent() chatBoard: gql.ChatBoard) {
    return await this.chatRoomService.load(chatBoard.recentRoom);
  }
  @ResolveField(() => gql.ChatBoard)
  async rootRoom(@Parent() chatBoard: gql.ChatBoard) {
    return await this.chatRoomService.load(chatBoard.rootRoom);
  }
}
