import { BaseGql, Field, ID, InputType, Int, ObjectType, PickType, createGraphQL, query } from "@shared/util-client";
import { Chat } from "../_scalar";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import graphql from "graphql-tag";

@InputType("ChatRoomInput")
export class ChatRoomInput {
  @Field(() => ID, { nullable: true })
  prevChat?: string;
}

@ObjectType("ChatRoom", { _id: "id" })
export class ChatRoom extends BaseGql(ChatRoomInput) {
  @Field(() => ID)
  root: string;

  @Field(() => Date)
  rootCreatedAt: Date;

  @Field(() => [Chat])
  chats: Chat[];

  @Field(() => ID, { nullable: true })
  nextChat?: string;

  // @Field(() => ChatContribution)
  // totalContribution: ChatContribution;

  // @Field(() => Map<String, ChatContribution>)
  // contribution: Map<string, ChatContribution>;

  @Field(() => Int)
  roomNum: number;

  @Field(() => [shared.User])
  users: shared.User[] | shared.LightUser[];

  @Field(() => [shared.File])
  files: shared.File[];

  // @Field(() => [Emoji])
  // emojis: Id[];

  // @Field(() => JSON)
  // read: Map<string, Date>;

  @Field(() => Int)
  unread?: number;

  @Field(() => String)
  status: cnst.ChatRoomStatus;
}

@ObjectType("LightChatRoom", { _id: "id", gqlRef: "ChatRoom" })
export class LightChatRoom extends PickType(ChatRoom, [
  "status",
  "prevChat",
  "root",
  "users",
  "chats",
  "roomNum",
  "unread",
] as const) {}

@ObjectType("ChatRoomSummary")
export class ChatRoomSummary {
  @Field(() => Int)
  totalChatRoom: number;
}

export const chatRoomQueryMap: { [key in keyof ChatRoomSummary]: any } = {
  totalChatRoom: { status: { $ne: "inactive" } },
};

export interface ChatLog {
  nickname: string;
  text: string;
}

export const chatRoomGraphQL = createGraphQL("chatRoom" as const, ChatRoom, ChatRoomInput, LightChatRoom);
export const {
  getChatRoom,
  listChatRoom,
  chatRoomCount,
  chatRoomExists,
  createChatRoom,
  updateChatRoom,
  removeChatRoom,
  chatRoomFragment,
  lightChatRoomFragment,
  purifyChatRoom,
  crystalizeChatRoom,
  lightCrystalizeChatRoom,
  defaultChatRoom,
  mergeChatRoom,
} = chatRoomGraphQL;

export type LoadChatRoomsQuery = { loadChatRooms: LightChatRoom[] };
export const loadChatRoomsQuery = graphql`
  ${lightChatRoomFragment}
  query loadChatRoomsQuery($chatRoomId: ID!, $limit: Int!) {
    loadChatRooms(chatRoomId: $chatRoomId, limit: $limit) {
      ...lightChatRoomFragment
    }
  }
`;
export const loadChatRooms = async (chatRoomId: string, limit: number) =>
  (await query<LoadChatRoomsQuery>(loadChatRoomsQuery, { chatRoomId, limit })).loadChatRooms;
