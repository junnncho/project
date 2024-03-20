import * as gql from "../gql";
import * as srv from "../srv";
import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { Args, ID, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ChatRoomService } from "./chatRoom.service";
import { UseGuards } from "@nestjs/common";
import { gql as shared } from "@shared/module";

@Resolver(() => gql.ChatRoom)
export class ChatRoomResolver extends BaseResolver(
  gql.ChatRoom,
  gql.ChatRoomInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(
    private readonly chatRoomService: ChatRoomService,
    private readonly userService: srv.shared.UserService,
    private readonly fileService: srv.shared.FileService,
    private readonly emojiService: srv.EmojiService
  ) {
    super(chatRoomService);
  }

  @Query(() => [gql.ChatRoom])
  @UseGuards(Allow.User)
  async loadChatRooms(
    @Args({ name: "chatRoomId", type: () => ID }) chatRoomId: string,
    @Args({ name: "limit", type: () => Int }) limit: number,
    @RequiredAuth() account: Account
  ) {
    return await this.chatRoomService.loadChatRooms(new Id(chatRoomId), account._id, limit);
  }

  @ResolveField(() => [shared.User])
  async users(@Parent() chatRoom: gql.ChatRoom) {
    return await this.userService.loadMany(chatRoom.users);
  }
  @ResolveField(() => [shared.File])
  async files(@Parent() chatRoom: gql.ChatRoom) {
    return await this.fileService.loadMany(chatRoom.files);
  }
  @ResolveField(() => [gql.Emoji])
  async emojis(@Parent() chatRoom: gql.ChatRoom) {
    return await this.emojiService.loadMany(chatRoom.emojis);
  }

  @ResolveField(() => Int)
  @UseGuards(Allow.User)
  async unread(@Parent() chatRoom: gql.ChatRoom, @RequiredAuth() account: Account) {
    if (!chatRoom.read.has(account._id.toString())) return chatRoom.chats.length;
    let count = 0;
    chatRoom.chats.forEach((chat) => {
      if (chat.at >= chatRoom.read[account._id.toString()]) count += 1;
    });
    return count;
  }
}
