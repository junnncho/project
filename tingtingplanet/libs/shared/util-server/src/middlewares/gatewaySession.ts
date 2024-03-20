import { Account, Id } from "@shared/util-server";
import { Inject, Injectable } from "@nestjs/common";
import { RedisOptions } from "../option";
import { Socket } from "socket.io";
import { createClient } from "redis";

export interface AuthenticatedSocket extends Socket {
  user: Account;
}

export interface IGatewaySessionManager {
  getUserSocket(id: Id): Promise<string | null>;
  setUserSocket(id: Id, socketId: string): Promise<void>;
  removeUserSocket(id: Id): Promise<void>;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  sessions: any;
  constructor(@Inject("REDIS_OPTIONS") private readonly redisOptions: RedisOptions) {
    this.sessions = createClient({
      url: `redis://${this.redisOptions.host}:${this.redisOptions.port}`,
      legacyMode: true,
    });
    this.sessions.on("error", async (e: any) => {
      console.log("REDIS ERROR:On gateway", e.message);
    });

    this.sessions.connect();
  }

  async getUserSocket(id: Id) {
    return new Promise<string>((resolve, reject) => {
      this.sessions.get(id.toString(), (e: any, data: string) => {
        if (e) {
          reject(e);
        }
        resolve(data);
      });
    });
  }

  async setUserSocket(userId: Id, socketId: string) {
    console.log(userId, socketId);
    await this.sessions.set(userId.toString(), socketId);
  }
  async removeUserSocket(userId: Id) {
    await this.sessions.del(userId.toString());
  }
}
