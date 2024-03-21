import graphql from "graphql-tag";
import { AnyVariables, createClient, Client as GqlClient, dedupExchange, cacheExchange } from "@urql/core";
import { io, Socket } from "socket.io-client";
import { Geolocation } from "./router";
import { Kaikas, Metamask, Wallet, WalletNetworkType, WalletConnect } from "./wallet";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import type { DocumentNode } from "graphql";

export type WalletType = "kaikas" | "metamask" | "walletConnect";
export interface Signature {
  signchain: string;
  signmessage: string;
  signaddress: string; // | string[];
}

export class Client {
  uri = "http://localhost:8080/graphql";
  gql: GqlClient = createClient({ url: this.uri });
  jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  wallet: Wallet;
  socket: Socket | null = null;
  signature: Signature | null = null;
  geolocation: Geolocation | null = null;
  signUntil = new Date(0);
  networkType: "mainnet" | "testnet" | "debugnet" = "debugnet";
  async init(uri: string, ws: string | null, data: Partial<Client> = {}) {
    Object.assign(this, data);
    return await Promise.all([this.setLink(uri), ...(ws ? [this.setSocket(ws)] : [])]);
  }
  async setSocket(ws: string) {
    // this.socket = io(ws, { transports: ["websocket"] });
    // return new Promise<void>((resolve, reject) => {
    //   this.socket?.on("connect", () => resolve());
    // });
  }
  async setLink(uri: string) {
    this.uri = uri;
    this.gql = createClient({
      url: this.uri,
      exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
      requestPolicy: "network-only",
      fetchOptions: () => {
        return {
          headers: {
            ...(this.jwt ? { authorization: `Bearer ${this.jwt}` } : {}),
            ...(this.signature ?? {}),
            ...(this.geolocation ? { geolocation: JSON.stringify(this.geolocation) } : {}),
          },
        };
      },
    });
  }
  async setGeolocation(geolocation: Geolocation) {
    this.geolocation = geolocation;
  }
  async setJwt(jwt: string) {
    this.jwt = jwt;
    localStorage.setItem("jwt", jwt);
  }
  setNetworkType(networkType: WalletNetworkType) {
    this.networkType = networkType;
    return this;
  }
  async setWallet(type: WalletType) {
    if (type === "metamask") this.wallet = await new Metamask(this.networkType).init();
    else if (type === "kaikas") this.wallet = await new Kaikas(this.networkType).init();
    else if (type === "walletConnect") this.wallet = await new WalletConnect(this.networkType).init();
    return await this.sign("Connect Wallet");
  }
  async reset() {
    if (this.socket) this.socket.disconnect();
    this.socket = null;
    this.jwt = null;
    this.signature = null;
    this.signUntil = new Date(0);
    localStorage.removeItem("jwt");
  }
  async sign(message: string, address?: string) {
    const hash = await encrypt(address ?? (await this.wallet.getAccount()));
    const signmessage = `${message} jwt:[${hash}] timeStamp:${Date.now()}`;
    this.signature = await this.wallet.sign(signmessage, address);
    this.signUntil = new Date(Date.now() + 1000 * 60 * 10); // 10 mins
  }
}
const client = new Client();
export default client;

export const mutate = async <Mutation = any>(mutation: DocumentNode, variables: AnyVariables) => {
  const data = (await client.gql.mutation<Mutation>(mutation, variables).toPromise()).data;
  if (!data) throw new Error(`Mutation Failed: ${mutation}`);
  return data;
};
export const query = async <Query = any>(query: DocumentNode, variables: AnyVariables) => {
  const data = (await client.gql.query<Query>(query, variables).toPromise()).data;
  if (!data) throw new Error(`Query Failed: ${query}`);
  return data;
};

export const encrypt = async (data: string) =>
  (
    await mutate<{ encrypt: string }>(
      graphql`
        mutation encrypt($data: String!) {
          encrypt(data: $data)
        }
      `,
      { data }
    )
  ).encrypt;
