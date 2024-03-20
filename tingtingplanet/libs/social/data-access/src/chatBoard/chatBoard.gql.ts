import { BaseGql, Field, InputType, Int, ObjectType, PickType, createGraphQL, mutate } from "@shared/util-client";
import { ChatRoom } from "../chatRoom/chatRoom.gql";
import { cnst } from "@shared/util";
import graphql from "graphql-tag";
import { gql } from "..";

@InputType("ChatBoardInput")
export class ChatBoardInput {
  @Field(() => String)
  name: string;

  @Field(() => ChatRoom)
  rootRoom: ChatRoom;

  @Field(() => ChatRoom)
  recentRoom: ChatRoom;
}

@ObjectType("ChatBoard", { _id: "id" })
export class ChatBoard extends BaseGql(ChatBoardInput) {
  @Field(() => String)
  status: cnst.ChatBoardStatus;
}

@ObjectType("LightChatBoard", { _id: "id", gqlRef: "ChatBoard" })
export class LightChatBoard extends PickType(ChatBoard, ["status", "name", "recentRoom"] as const) {}
// export class LightChatBoard extends PickType(ChatBoard, ["status", "name", "recentRoom", "unread"] as const) {}

@ObjectType("ChatBoardSummary")
export class ChatBoardSummary {
  @Field(() => Int)
  totalChatBoard: number;
}

export const chatBoardQueryMap: { [key in keyof ChatBoardSummary]: any } = {
  totalChatBoard: { status: { $ne: "inactive" } },
};

export const chatBoardGraphQL = createGraphQL("chatBoard" as const, ChatBoard, ChatBoardInput, LightChatBoard);
export const {
  getChatBoard,
  listChatBoard,
  chatBoardCount,
  chatBoardExists,
  createChatBoard,
  updateChatBoard,
  removeChatBoard,
  chatBoardFragment,
  lightChatBoardFragment,
  purifyChatBoard,
  crystalizeChatBoard,
  lightCrystalizeChatBoard,
  defaultChatBoard,
} = chatBoardGraphQL;

export type NewChatMutation = { newChat: string };
export const newChatMutation = graphql`
  mutation newChat($chatBoardId: ID!, $text: String!) {
    newChat(chatBoardId: $chatBoardId, text: $text)
  }
`;
export const newChat = async (chatBoardId: string, text: string) => {
  return (await mutate<NewChatMutation>(newChatMutation, { chatBoardId, text })).newChat;
};

export type GenerateChatBoardMutation = { generateChatBoard: string };
export const generateChatBoardMutation = graphql`
  mutation generateChatBoard($userIds: [ID!]!, $roomName: String!) {
    generateChatBoard(userIds: $userIds, roomName: $roomName)
  }
`;
export const generateChatBoard = async (userIds: string[], roomName: string) => {
  const genChat = await mutate<GenerateChatBoardMutation>(generateChatBoardMutation, {
    userIds,
    roomName,
  });
  console.log("genChat", genChat);
  return genChat.generateChatBoard;
};

export type InviteChatBoardMutation = { inviteChatBoard: string };
export const inviteChatBoardMutation = graphql`
  mutation inviteChatBoard($chatBoardId: ID!, $userId: ID!) {
    inviteChatBoard(chatBoardId: $chatBoardId, userId: $userId)
  }
`;
export const inviteChatBoard = async (chatBoardId: string, userId: string) =>
  (
    await mutate<InviteChatBoardMutation>(inviteChatBoardMutation, {
      chatBoardId,
      userId,
    })
  ).inviteChatBoard;

export type KickChatBoardMutation = { kickChatBoard: string };
export const kickChatBoardMutation = graphql`
  mutation kickChatBoard($chatBoardId: ID!, $userId: ID!) {
    kickChatBoard(chatBoardId: $chatBoardId, userId: $userId)
  }
`;
export const kickChatBoard = async (chatBoardId: string, userId: string) =>
  (
    await mutate<KickChatBoardMutation>(kickChatBoardMutation, {
      chatBoardId,
      userId,
    })
  ).kickChatBoard;

export type JoinChatBoardMutation = { joinChatBoard: string };
export const joinChatBoardMutation = graphql`
  mutation joinChatBoard($chatBoardId: ID!) {
    joinChatBoard(chatBoardId: $chatBoardId)
  }
`;
export const joinChatBoard = async (chatBoardId: string) =>
  (await mutate<JoinChatBoardMutation>(joinChatBoardMutation, { chatBoardId })).joinChatBoard;

export type ExitChatBoardMutation = { exitChatBoard: string };
export const exitChatBoardMutation = graphql`
  mutation exitChatBoard($chatBoardId: ID!) {
    exitChatBoard(chatBoardId: $chatBoardId)
  }
`;
export const exitChatBoard = async (chatBoardId: string) =>
  (await mutate<ExitChatBoardMutation>(exitChatBoardMutation, { chatBoardId })).exitChatBoard;
