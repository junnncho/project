import { AuthenticatedSocket, IGatewaySessionManager } from "@shared/util-server";
import { BoardResponse, ReadResponse, RoomExitResponse, RoomJoinResponse, RoomResponse } from "./gateway.type";
import { ChatBoardService } from "./chatBoard.service";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Id, LogService } from "@shared/util-server";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Server } from "socket.io";
import { UserService } from "../srv";

@Injectable()
@WebSocketGateway(1234)
export class ChatBoardGateWay extends LogService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatBoardService: ChatBoardService,
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2,
    @Inject("GATEWAY_SESSION_MANAGER") readonly sessions: IGatewaySessionManager
  ) {
    super(ChatBoardGateWay.name);
  }

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: AuthenticatedSocket) {
    try {
      console.log("connection");
      await this.sessions.setUserSocket(socket.user._id, socket.id);
      const chatBoards = await this.userService.getChatBoards(socket.user._id);
      chatBoards && socket.join(chatBoards.map((id) => id.toString()));
    } catch (e) {
      console.log(e.message);
    }

    socket.emit("connected", "connected");
  }

  async handleDisconnect(socket: AuthenticatedSocket) {
    try {
      console.log("disconnection");
      console.log(`${socket.user._id.toString()} disconnected.`);
      await this.sessions.removeUserSocket(socket.user._id);
    } catch (e) {
      console.log(e.message);
    }
  }

  @OnEvent("room.create")
  async roomCreateEmitter(payload: BoardResponse) {
    // console.log("SESSION", this.sessions.getSockets());
    const { chatBoard } = payload;
    for (const user of chatBoard.recentRoom.users) {
      const userSocket = await this.sessions.getUserSocket(user._id);
      if (userSocket) {
        this.server.in(userSocket).socketsJoin(chatBoard.id);
      }
    }
    // console.log(payload, boardId, await this.server.sockets.
    //emit payloads to all sockets in the room
    this.server.to(chatBoard.id).emit("newChatBoard", payload);
    // this.server.to(boardId).emit("newChatBoard", payload);
  }

  @OnEvent("room.join")
  async roomJoinEmitter(payload: RoomJoinResponse) {
    const { chatBoard, joiner } = payload;
    const joinerSocket = await this.sessions.getUserSocket(joiner);
    if (joinerSocket) {
      this.server.in(joinerSocket).socketsJoin(chatBoard.id);
      this.server.in(joinerSocket).emit("newChatBoard", { chatBoard });
    }

    this.server.to(chatBoard.id).emit("newChat", {
      chatRoom: chatBoard.recentRoom,
      boardId: chatBoard.id,
    }); //chatBoard full type으로 가야대는거아닌가
  }

  @OnEvent("room.exit")
  async roomLeaveEmitter(payload: RoomExitResponse) {
    const { boardId, chatRoom, leaver } = payload;
    const leaverSocket = await this.sessions.getUserSocket(leaver);
    if (leaverSocket) {
      this.server.in(leaverSocket).emit("kicked", { boardId });
      this.server.in(leaverSocket).socketsLeave(boardId);
    }
    this.server.to(boardId).emit("newChat", { boardId, chatRoom });
  }

  @OnEvent("chat.create")
  chatCreateEmitter(payload: RoomResponse) {
    const { chatRoom, boardId } = payload;
    console.log("CHAT", this.server.to(boardId));
    this.server.to(boardId).emit("newChat", payload);
  }

  @OnEvent("test")
  testEmitter(payload: string) {
    console.log("testEmitter", payload);
  }

  @SubscribeMessage("readChatBoard")
  async readChatBoard(@MessageBody() payload: ReadResponse, @ConnectedSocket() client: AuthenticatedSocket) {
    console.log("readChatBoard", payload);
    const response = await this.chatBoardService.readChatBoard(client.user._id, new Id(payload.boardId));
    console.log(await this.server.to(payload.boardId).fetchSockets());
    this.server.to(payload.boardId).emit("readChatBoard", response);
  }

  @SubscribeMessage("test")
  async test(client: AuthenticatedSocket) {
    console.log("Test", client.user._id);
    this.eventEmitter.emit("test", "ABCDEFG");
    // this.sessions.getSockets().forEach(function (value, key) {
    //   value.emit("test", "test");
    // });

    // client.emit("test", "test");
  }

  // @SubscribeMessage("initChatBoard")
  // async connectChatServer(client: Socket, userId: string) {
  //   const chatBoardList = await this.chatBoardService.list({ users: userId });
  //   chatBoardList.forEach((chatBoard) => {
  //     client.join(chatBoard.id);
  //     client.join("rounge");
  //     client.rooms.add("rounge");
  //     client.rooms.add(chatBoard.id);
  //   });
  //   client.on("disconnect", () => {
  //     this.logger.log(disconnect);
  //   });
  //   client.on("leave", () => {
  //     client.rooms.clear();
  //     chatBoardList.forEach((chatBoard) => {
  //       client.leave(chatBoard.id);
  //     });
  //   });
  //   client.emit("ChatBoardList", chatBoardList);
  //   return chatBoardList;
  // }

  // @SubscribeMessage("createChatBoard")
  // async createChatBoard(client: Socket, { users, name }) {
  //   // const room = await this.chatRoomService.openRoom(roomId, userId);
  //   const room = await this.chatRoomService.createRoot(users);
  //   const chatBoard = await this.chatBoardService.create({ rootRoom: room._id, recentRoom: room._id, name });
  //   client.join(chatBoard.id);
  //   client.rooms.add(chatBoard.id);
  //   const connectedUsers = (await this.server.in("rounge").fetchSockets()).filter((client) => {
  //     users.include(client.data.userId);
  //   });
  //   connectedUsers.forEach((client) => {
  //     client.emit("newChatBoard", chatBoard);
  //     client.join(chatBoard.id);
  //     client.rooms.add(chatBoard.id);
  //   });
  //   client.on("disconnect", () => {
  //     this.logger.log(disconnect);
  //   });
  //   client.on("leave", () => {
  //     client.rooms.clear();
  //     client.leave(chatBoard.id);
  //   });
  //   return { room, chatBoard };
  // }

  // @SubscribeMessage("viewChatBoard")
  // async viewChatBoard(client: Socket, chatBoardId: string) {
  //   const chatBoard = await this.chatBoardService.get(new Id(chatBoardId));
  //   client.join(chatBoard.id);
  //   client.rooms.add(chatBoard.id);
  //   client.emit("openChatBoard", chatBoard);
  //   return chatBoard;
  // }

  // @SubscribeMessage("chat")
  // async chat(client: Socket, { from, to, text, chatBoardId }) {
  //   console.log("data", from, to, text, "data s");
  //   const newRoom = this.chatBoardService.chat(from, text, chatBoardId);
  //   // if (roomId === "public") this.server.emit(`chat:${roomId}`, data);
  //   // const sockets = this.server.of("/").in(roomId);
  //   // return sockets.emit(`chat:${roomId}`, data);
  // }

  // @SubscribeMessage("identity")
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }
}
