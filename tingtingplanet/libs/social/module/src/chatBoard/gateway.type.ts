import { Chat } from "../gql";
import { ChatBoardResolve } from "./chatBoard.model";
import { ChatRoomResolve } from "../chatRoom/chatRoom.model";
import { Id } from "@shared/util-server";

// export type CreateMessageResponse = {
//     message: Message;
//     conversation: Conversation;
//   };

export interface RoomCreateResponse {
  boardId: string;
  users: Id[];
}

export interface ChatCreateResponse {
  boardId: string;
  chat: Chat;
}

export interface RoomJoinResponse {
  joiner: Id;
  chatBoard: ChatBoardResolve;
}
export interface RoomExitResponse extends RoomResponse {
  leaver: Id;
}

export interface RoomReadPayload {
  chatBoardId: string;
}

export interface RoomReadResponse {
  read: Map<string, Date>;
  boardId: string;
}

export interface BoardResponse {
  chatBoard: ChatBoardResolve;
}

export interface BoardIdResponse {
  boardId: string;
}

export interface RoomResponse {
  chatRoom: ChatRoomResolve;
  boardId: string;
}

export interface ReadResponse {
  read: Map<string, Date>;
  boardId: string;
}
