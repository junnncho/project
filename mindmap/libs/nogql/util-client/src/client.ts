import {
  AnyVariables,
  Client as GqlClient,
  OperationContext,
  cacheExchange,
  createClient,
  dedupExchange,
} from "@urql/core";
// import { Geolocation } from "./router";
// import { Kaikas, Metamask, Wallet, WalletConnect, WalletNetworkType } from "./wallet";
import { Socket, io } from "socket.io-client";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import graphql from "graphql-tag";
import type { DocumentNode } from "graphql";

export type WalletType = "kaikas" | "metamask" | "walletConnect";
export interface Signature {
  signchain: string;
  signmessage: string;
  signaddress: string; // | string[];
}

export class Client {
  uri = "http://localhost:8080/backend/graphql";
  ws = "http://localhost:8080";
  gql: GqlClient = createClient({ url: this.uri, fetch, exchanges: [] });
  jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  mobileToken: string;
  // wallet: Wallet;
  socket: Socket | null = null;
  signature: Signature | null = null;
  geolocation: Geolocation | null = null;
  signUntil = new Date(0);
  networkType: "mainnet" | "testnet" | "debugnet" = "debugnet";
  async init(data: Partial<Client> = {}) {
    Object.assign(this, data);
    if (!this.jwt) this.jwt = localStorage.getItem("jwt");
    return await Promise.all([this.setLink(data.uri), this.setSocket(data.ws)]);
  }

  async setSocket(ws = typeof window !== "undefined" ? window.location.origin : "http://localhost:8080") {
    this.ws = ws;
    this.socket = io(ws, { transports: ["websocket"] });
  }
  setLink(
    uri = typeof window !== "undefined"
      ? `${window.location.origin}/backend/graphql`
      : "http://localhost:8080/backend/graphql"
  ) {
    this.uri = uri;
    this.gql = createClient({
      url: this.uri,
      exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
      requestPolicy: "network-only",

      fetchOptions: () => {
        return {
          headers: {
            "apollo-require-preflight": "true",
            ...(this.jwt ? { authorization: `Bearer ${this.jwt}` } : {}),
            ...(this.signature ?? {}),
            ...(this.geolocation ? { geolocation: JSON.stringify(this.geolocation) } : {}),
          },
        };
      },
    });
  }
  setGeolocation(geolocation: Geolocation) {
    this.geolocation = geolocation;
  }

  setExpoToken(expo: string) {
    this.mobileToken = expo;
  }

  setJwt(jwt: string) {
    this.jwt = jwt;
    localStorage.setItem("jwt", jwt);
  }
  // setNetworkType(networkType: WalletNetworkType) {
  //   this.networkType = networkType;
  //   return this;
  // }
  // async setWallet(type: WalletType) {
  //   if (type === "metamask") this.wallet = await new Metamask(this.networkType).init();
  //   else if (type === "kaikas") this.wallet = await new Kaikas(this.networkType).init();
  //   else if (type === "walletConnect") this.wallet = await new WalletConnect(this.networkType).init();
  //   return await this.sign("Connect Wallet");
  // }
  reset() {
    if (this.socket) this.socket.disconnect();
    this.socket = null;
    this.jwt = null;
    this.signature = null;
    this.signUntil = new Date(0);
    localStorage.removeItem("jwt");
  }
  // async sign(message: string, address?: string) {
  //   console.log(1);
  //   const hash = await encrypt(address ?? (await this.wallet.getAccount()));
  //   console.log(2);
  //   const signmessage = `${message} jwt:[${hash}] timeStamp:${Date.now()}`;
  //   console.log(3);
  //   this.signature = await this.wallet.sign(signmessage, address);
  //   console.log(4);
  //   this.signUntil = new Date(Date.now() + 1000 * 60 * 10); // 10 mins
  // }
}
export const client = new Client();

export const mutate = async <Mutation = any>(
  mutation: DocumentNode,
  variables: AnyVariables,
  options: Partial<OperationContext> = {}
) => {
  const { data, error } = await client.gql
    .mutation<Mutation>(mutation, variables, {
      fetchOptions: {
        headers: {
          "apollo-require-preflight": "true",
          ...(client.jwt ? { authorization: `Bearer ${client.jwt}` } : {}),
          ...(client.signature ?? {}),
          ...(client.geolocation ? { geolocation: JSON.stringify(client.geolocation) } : {}),
        },
      },
      ...options,
    })
    .toPromise();
  if (!data) throw new Error(`Mutation Failed: ${error?.message}`);
  return data;
};
export const query = async <Query = any>(
  query: DocumentNode,
  variables: AnyVariables,
  options: Partial<OperationContext> = {}
) => {
  const { data, error } = await client.gql
    .query<Query>(query, variables, {
      fetchOptions: {
        headers: {
          "apollo-require-preflight": "true",
          ...(client.jwt ? { authorization: `Bearer ${client.jwt}` } : {}),
          ...(client.signature ?? {}),
          ...(client.geolocation ? { geolocation: JSON.stringify(client.geolocation) } : {}),
        },
      },
      ...options,
    })
    .toPromise();
  if (!data) throw new Error(`Query Failed: ${error?.message}`);
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
