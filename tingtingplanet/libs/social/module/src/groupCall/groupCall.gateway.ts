import { LogService } from "@shared/util-server";
import { Server, Socket } from "socket.io";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
@WebSocketGateway({ cors: { origin: "*" } })
export class GroupCallGateway extends LogService {
  @WebSocketServer()
  server: Server;

  constructor() {
    super(GroupCallGateway.name);
  }

  @SubscribeMessage("join")
  async join(client: Socket, { roomId, userId }: any) {
    const sockets = this.server.of("/").in(roomId);
    const clients = await sockets.fetchSockets();
    client.data = { roomId, userId };
    if (clients.length === 0) {
      this.logger.log(`created Room ${roomId}`);
      client.join(roomId);
      client.rooms.add(roomId);
    } else if (clients.length > 0) {
      this.logger.log(`joined ${userId} from to ${roomId}`);
      for (const client_ of clients) client_.emit("introduce", { userId });
      client.join(roomId);
    } else {
      client.rooms.clear();
      client.leave(roomId);
      client.emit("full");
    }

    client.on("disconnect", () => {
      this.logger.log("disconnect");
      this.server.to(roomId).emit(`disconnected:${userId}`);
    });

    client.on("leave", () => {
      this.logger.log("leave");
      this.server.to(roomId).emit(`disconnected:${userId}`);
      client.rooms.clear();
      client.leave(roomId);
    });
  }
  @SubscribeMessage("welcome")
  async receive(client: Socket, { userId, roomId, from }: any) {
    const sockets = this.server.of("/").in(roomId);
    const clients = await sockets.fetchSockets();
    const receiver = clients.find((client) => client.data.userId === from);
    receiver && receiver.emit("welcome", { roomId, userId });
  }

  @SubscribeMessage("signal")
  async exchange(client: Socket, { desc, roomId, userId, from }: any) {
    this.logger.log("to :", from, "from : ", userId, "roomId : ", roomId);
    const sockets = this.server.of("/").in(roomId);
    const clients = await sockets.fetchSockets();
    const socket = clients.find((client) => client.data.userId === from);
    if (!socket) {
      console.log("socket not found");
      return;
    }
    console.log("signaling");
    socket.emit(`desc:${userId}`, { desc, userId });
  }

  // @SubscribeMessage("leave")
  // async leave(client: Socket, { selfId }) {
  //   this.logger.log("leave");
  //   const roomId = client.rooms.values()[0];
  //   if (roomId) this.server.to(roomId).emit(`disconnected:${selfId}`);
  //   client.rooms.clear();
  //   client.leave(roomId);
  // }
}
