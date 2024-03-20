import * as ChatBoard from "./chatBoard.model";
import * as gql from "../gql";
import { ChatBoardResolve } from "./chatBoard.model";
import { ChatRoomService } from "../chatRoom/chatRoom.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Id, LoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class ChatBoardService extends LoadService<ChatBoard.Mdl, ChatBoard.Doc, ChatBoard.Input> {
  constructor(
    @InjectModel(ChatBoard.name)
    private readonly ChatBoard: ChatBoard.Mdl,
    private readonly chatRoomService: ChatRoomService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2
  ) {
    super(ChatBoardService.name, ChatBoard);
  }

  async userBoards(userId: Id) {
    const chatBoards = await this.ChatBoard.find();
    const chatRooms = await this.chatRoomService.loadMany(chatBoards.map((board) => board.recentRoom));
    const myChatRooms = chatRooms.filter((room) => room.users.some((user) => user.equals(userId)));
    return myChatRooms;
  }

  async resolveChatBoard(chatBoard: ChatBoard.Doc) {
    const rooms = await Promise.all([
      this.chatRoomService.load(chatBoard.recentRoom),
      this.chatRoomService.load(chatBoard.rootRoom),
    ]);
    if (!rooms[0] || !rooms[1]) throw new Error("no found room");
    const resolvedRooms = await Promise.all([
      this.chatRoomService.resolveChatRoom(rooms[0]),
      this.chatRoomService.resolveChatRoom(rooms[1]),
    ]);

    return {
      ...chatBoard.toObject(),
      recentRoom: resolvedRooms[0],
      rootRoom: resolvedRooms[1],
    } as unknown as ChatBoardResolve;
  }
  async authGet(id: Id, userId: Id): Promise<ChatBoard.Doc> {
    const result = await Promise.all([this.load(id), this.userService.load(userId)]);
    if (!result[1]) throw new Error("No User");
    // if (!result[1].chatBoards.some((board) => board.equals(id))) throw new Error("No Auth");
    if (!result[0]) throw new Error("No ChatBoard");
    await this.readChatBoard(userId, id);
    return result[0];
  }

  async newChatBoard(userIds: Id[], name?: string): Promise<ChatBoard.Doc> {
    if (userIds.length === 0) throw new Error("No User");
    const chatRoom = await this.chatRoomService.createRoot(userIds);
    const chatBoard = await this.ChatBoard.create({
      recentRoom: chatRoom._id,
      rootRoom: chatRoom._id,
      name,
    });
    await chatRoom.merge({ root: chatBoard._id }).save();

    for (const userId of userIds) {
      await this.userService.addChatBoard(userId, chatBoard._id);
    }
    const resolvedBoard = await this.resolveChatBoard(chatBoard);
    const response = { chatBoard: resolvedBoard };
    this.eventEmitter.emit("room.create", response);
    return chatBoard;
  }

  async newChat(senderId: Id, chatBoardId: Id, text: string): Promise<ChatBoard.Doc> {
    try {
      const chatBoard = await this.ChatBoard.pickById(chatBoardId);
      const chatRoom = await this.chatRoomService.addChat(senderId, chatBoard.recentRoom, text);
      if (!chatBoard.recentRoom.equals(chatRoom._id)) {
        await chatBoard.merge({ recentRoom: chatRoom._id }).save();
      }
      const resolvedRoom = await this.chatRoomService.resolveChatRoom(chatRoom);
      const response = { chatRoom: resolvedRoom, boardId: chatBoard.id };
      this.eventEmitter.emit("chat.create", response);
      return chatBoard;
    } catch (e) {
      this.logger.error(e.message);
      throw new Error(e.message);
    }
  }

  async joinChatBoard(userId: Id, chatBoardId: Id): Promise<ChatBoard.Doc> {
    try {
      const chatBoard = await this.ChatBoard.pickById(chatBoardId);
      await this.userService.addChatBoard(userId, chatBoardId);
      const chatRoom = await this.chatRoomService.addMember(userId, chatBoard.recentRoom);
      await chatBoard.merge({ recentRoom: chatRoom._id }).save();
      const resolvedBoard = await this.resolveChatBoard(chatBoard);
      const response = { chatBoard: resolvedBoard, joiner: userId };
      this.eventEmitter.emit("room.join", response);
      return chatBoard;
    } catch (e) {
      this.logger.error(e.message);
      throw new Error(e.message);
    }
  }

  async exitChatBoard(userId: Id, chatBoardId: Id): Promise<ChatBoard.Doc> {
    try {
      const chatBoard = await this.ChatBoard.pickById(chatBoardId);
      await this.userService.removeChatBoard(userId, chatBoardId);
      const user = await this.userService.load(userId);
      const chatRoom = await this.chatRoomService.removeMember(userId, chatBoard.recentRoom);
      await chatBoard.merge({ recentRoom: chatRoom._id }).save();
      const resolvedRoom = await this.chatRoomService.resolveChatRoom(chatRoom);
      const response = {
        chatRoom: resolvedRoom,
        boardId: chatBoard.id,
        leaver: userId,
      };
      this.eventEmitter.emit("room.exit", response);
      return chatBoard;
    } catch (e) {
      this.logger.error(e.message);
      throw new Error(e.message);
    }
  }

  async readChatBoard(userId: Id, chatBoardId: Id) {
    const chatBoard = await this.ChatBoard.pickById(chatBoardId);
    const chatRoom = await this.chatRoomService.readRoom(userId, chatBoard.recentRoom);
    const response = { read: chatRoom.read, chatBoardId: chatBoard.id };
    return response;
  }

  async summarize(): Promise<gql.ChatBoardSummary> {
    return {
      totalChatBoard: await this.ChatBoard.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }

  // async chat(from: string, text: string, chatBoardId: string) {
  //   const chatBoard = await this.ChatBoard.pickById(chatBoardId);
  //   const chatRoom = await this.chatRoomService.pick({ _id: chatBoard.recentRoom });
  //   if (chatRoom.chats.length < 20) {
  //     chatRoom
  //       ?.addChat({
  //         parent: chatRoom.id,
  //         from: new Id(from),
  //         type: "text",
  //         images: [],
  //         emoji: undefined,
  //         text,
  //         at: new Date(),
  //       })
  //       .save();
  //     this.chatSocketGateWay.server.of("/chat").to(chatBoard.id).emit("chatAdded", chatRoom);
  //     return;
  //   }
  //   const newChatRoom = await this.chatRoomService.create({});
  //   newChatRoom
  //     .merge({
  //       users: chatRoom.users,
  //       chats: [],
  //       root: chatRoom.root,
  //       rootCreatedAt: chatRoom.rootCreatedAt,
  //       roomNum: chatRoom.roomNum + 1,
  //       totalContribution: { count: 0, size: 0, totalCount: 0, totalSize: 0 },
  //       contribution: new Map<string, ChatContribution>(),
  //       files: [],
  //       emojis: [],
  //       read: new Map<string, Date>(),
  //       status: "active",
  //     })
  //     .save();
  //   newChatRoom
  //     ?.addChat({
  //       parent: chatRoom.id,
  //       from: new Id(from),
  //       type: "text",
  //       images: [],
  //       emoji: undefined,
  //       text,
  //       at: new Date(),
  //     })
  //     .save();
  //   this.chatSocketGateWay.server.of("/chat").to(chatBoard.id).emit("newChat", newChatRoom);

  //   return await chatBoard.merge({ recentRoom: newChatRoom.id }).save();
  // }

  // override async create(data: ChatBoard.Input, { account }: LoadConfig) {
  //   if (!account) throw new Error("No Account");
  //   const rootChatRoom = await this.chatRoomService.create({});
  //   rootChatRoom.merge({ root: chatBoard, rootCreatedAt: new Date(), roomNum: 0, chats: [] }).save();
  //   const newChatBoard = await chatBoard.merge({ recentRoom: rootChatRoom.id, rootRoom: rootChatRoom.id }).save();
  //   const client = this.chatSocketGateWay.server.of("/chat").to(chatBoard.id); // rounge 에서 유저 더 찾아넣는 기능 필요
  //   client.emit("chatBoard", newChatBoard);
  //   return newChatBoard;
  // }

  // async exitChatBoard(chatBoardId: string, userId: Id) {
  //   const chatBoard = await this.ChatBoard.pickById(chatBoardId);
  //   const chatRoom = await this.chatRoomService.pick({ _id: chatBoard.recentRoom });
  //   const newChatRoom = await this.chatRoomService.create({ prevChat: chatRoom.id });
  //   newChatRoom
  //     .merge({
  //       users: chatRoom.users.filter((user) => user._id !== userId),
  //       //roomnum, root, 등등추가적으로 초기화, tail 이라 create 할때 넣는건 안되고 merge 해줘야함
  //     })
  //     .save();
  //   chatBoard.merge({ recentRoom: newChatRoom.id }).save();
  //   this.chatSocketGateWay.server.of("/chat").to(chatBoard.id).emit("userExit", newChatRoom);
  //   return chatBoard;
  // }

  // async joinChatBoard(chatBoardId: string, userId: Id) {
  //   const chatBoard = await this.ChatBoard.pickById(chatBoardId);
  //   const chatRoom = await this.chatRoomService.pick({ _id: chatBoard.recentRoom });
  //   const newChatRoom = await this.chatRoomService.create({ prevChat: chatRoom.id });
  //   newChatRoom
  //     .merge({
  //       users: [...chatRoom.users, userId],
  //       //roomnum, root, 등등추가적으로 초기화, tail 이라 create 할때 넣는건 안되고 merge 해줘야함
  //     })
  //     .save();
  //   chatBoard.merge({ recentRoom: newChatRoom.id }).save();
  //   this.chatSocketGateWay.server.of("/chat").to(chatBoard.id).emit("userInvite", newChatRoom);
  //   return chatBoard;
  // }
}
