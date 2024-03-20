import * as ChatRoom from "./chatRoom.model";
import * as gql from "../gql";
import { ChatRoomResolve } from "./chatRoom.model";
import { Id, LoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class ChatRoomService extends LoadService<ChatRoom.Mdl, ChatRoom.Doc, ChatRoom.Input> {
  constructor(
    @InjectModel(ChatRoom.name)
    private readonly ChatRoom: ChatRoom.Mdl,
    private readonly userService: UserService
  ) {
    super(ChatRoomService.name, ChatRoom);
  }

  async loadChatRooms(chatRoomId: Id, accountId, limit = 3) {
    const chatRooms: ChatRoom.Doc[] = [];
    let chatRoom: ChatRoom.Doc | null = await this.load(chatRoomId);

    for (let i = 0; i < limit; i++) {
      if (!chatRoom) break;
      if (!chatRoom.users.some((user) => user.equals(accountId))) break;
      chatRooms.push(chatRoom);
      if (!chatRoom?.prevChat) break;
      chatRoom = await this.load(chatRoom.prevChat);
    }
    return chatRooms.reverse();
  }

  async createRoot(userIds: Id[]) {
    const chatRoom = await this.ChatRoom.create({ users: userIds });
    return chatRoom;
  }

  async resolveChatRoom(chatRoom: ChatRoom.Doc) {
    const recentUsers = await this.userService.resolveImages(chatRoom?.users);
    return {
      ...chatRoom.toObject(),
      users: recentUsers,
    } as unknown as ChatRoomResolve[];
  }

  async createNode(recentRoom: ChatRoom.Doc, newIds?: Id[]) {
    const newChatRoom = await this.ChatRoom.createNext(recentRoom, newIds);
    return newChatRoom;
  }

  async addChat(senderId: Id, chatRoomId: Id, text: string) {
    const chatRoom = await this.ChatRoom.pickById(chatRoomId);
    if (!chatRoom.users.some((user) => user.equals(senderId))) throw new Error("not member");
    if (chatRoom.chats.length < 20) {
      await chatRoom.addChat({ parent: chatRoom.id, from: senderId, text }).save();
      return chatRoom;
    } else {
      const newChatRoom = await this.createNode(chatRoom);
      await newChatRoom.addChat({ parent: newChatRoom.id, from: senderId, text }).save();
      return newChatRoom;
    }
  }
  async readRoom(readerId: Id, chatRoomId: Id) {
    const chatRoom = await this.ChatRoom.pickById(chatRoomId);
    if (!chatRoom.users.some((user) => user.equals(readerId))) throw new Error("not member");
    return await chatRoom.addRead(readerId).save();
  }

  async addMember(userId: Id, chatRoomId: Id) {
    const chatRoom = await this.ChatRoom.pickById(chatRoomId);
    if (chatRoom.users.some((user) => user.equals(userId))) throw new Error("already member");
    const newChatRoom = await this.createNode(chatRoom, [...chatRoom.users, userId]);
    return newChatRoom;
  }

  async removeMember(userId: Id, chatRoomId: Id) {
    const chatRoom = await this.ChatRoom.pickById(chatRoomId);
    if (!chatRoom.users.some((user) => user.equals(userId))) throw new Error("already not member");
    const newChatRoom = await this.createNode(
      chatRoom,
      chatRoom.users.filter((id) => !userId.equals(id))
    );
    return newChatRoom;
  }

  async summarize(): Promise<gql.ChatRoomSummary> {
    return {
      totalChatRoom: await this.ChatRoom.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }

  // async initRooms(client: Socket, self: string) {
  //   const rooms = await this.ChatRoom.find({ status: { $ne: "inactive" } });
  //   return rooms;
  // }

  // async chat(from: string, to: string, text: string) {
  //   console.log(from, to, text);
  //   const chatRoom = await this.ChatRoom.findOne({ users: new Id(to) });
  //   console.log(chatRoom, "heres chatRoom!!!!!");
  //   chatRoom
  //     ?.addChat({
  //       parent: chatRoom.id,
  //       from: new Id(from),
  //       type: "text",
  //       text,
  //       at: new Date(),
  //     })
  //     .save();
  // }
}
