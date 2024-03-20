import * as cookie from "cookie";
import { AuthenticatedSocket } from "./gatewaySession";
import { INestApplicationContext, Logger } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";
import { verifyToken } from "./authorization";

export class WebsocketAdapter extends IoAdapter {
  secret: string;
  constructor(appOrHttpServer: INestApplicationContext | any, secret: string) {
    super(appOrHttpServer);
    this.secret = secret;
  }
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      console.log("Inside Websocket Middleware");
      try {
        const { cookie: clientCookie } = socket.handshake.headers;
        if (!clientCookie) {
          console.log("Client has no cookies");
          return next(new Error("Not Authenticated. No cookies were sent"));
        }
        const { JWT } = cookie.parse(clientCookie);
        console.log("JWT", JWT);
        if (!JWT) {
          console.log("JWT DOES NOT EXIST");
          return next(new Error("Not Authenticated"));
        }
        const user = verifyToken(this.secret, JWT);
        if (!user) return next(new Error("Error signing cookie"));
        //   const sessionDB = await sessionRepository.findOne({ id: signedCookie });
        //   if (!sessionDB) return next(new Error("No session found"));

        socket.user = user;
        next();
      } catch (e) {
        Logger.error(`SOCKET-MIDDLEWARE: ${e.message}`);
      }
    });
    return server;
  }
}
