import * as cookie from "cookie";
import { AuthenticatedSocket } from "./gatewaySession";
import { INestApplicationContext, Logger } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { verifyToken } from "./authorization";

interface RedisIoAdapterOption extends Partial<ServerOptions> {
  jwtSecret: string;
}

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  logger: Logger;
  option: RedisIoAdapterOption;
  constructor(appOrHttpServer: INestApplicationContext | any, option: RedisIoAdapterOption) {
    super(appOrHttpServer);
    this.option = option;
    this.logger = new Logger("RedisIoAdapter");
  }
  async connectToRedis(url: string): Promise<void> {
    const pubClient = createClient({ url });
    const subClient = pubClient.duplicate();
    pubClient.on("disconnect", async (err) => {
      this.logger.error(`Redis pub database is disconnected. Error: ${err}`);
      await pubClient.connect();
    });
    subClient.on("disconnect", async (err) => {
      this.logger.error(`Redis sub database is disconnected. Error: ${err}`);
      await subClient.connect();
    });
    pubClient.on("error", async (err) => {
      this.logger.error(`Redis pub database is errored. Error: ${err}`);
      await pubClient.disconnect();
      await pubClient.connect();
    });
    subClient.on("error", async (err) => {
      this.logger.error(`Redis sub database is errored. Error: ${err}`);
      await subClient.disconnect();
      await subClient.connect();
    });
    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    server.use(async (socket: AuthenticatedSocket, next) => {
      try {
        const { cookie: clientCookie } = socket.handshake.headers;
        if (!clientCookie) {
          console.log("Client has no cookies");
          return next(new Error("Not Authenticated. No cookies were sent"));
        }
        const { JWT } = cookie.parse(clientCookie);
        console.log("JWT", JWT);
        if (!JWT) {
          return next(new Error("Not Authenticated"));
        }
        const user = verifyToken(this.option.jwtSecret, JWT);
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
