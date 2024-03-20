import {
  AnyVariables,
  Client as GqlClient,
  OperationContext,
  cacheExchange,
  createClient,
  dedupExchange,
} from "@urql/core";
import { Geolocation } from "./router";
import { Socket, io } from "socket.io-client";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import graphql from "graphql-tag";
import type { DocumentNode } from "graphql";


export class Client {
  uri = "http://localhost:8080/backend/graphql";
  ws = "http://localhost:8080";
  gql: GqlClient = createClient({ url: this.uri, fetch, exchanges: [] });
  jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  mobileToken: string;
  socket: Socket | null = null;
  geolocation: Geolocation | null = null;
  signUntil = new Date(0);
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

  reset() {
    if (this.socket) this.socket.disconnect();
    this.socket = null;
    this.jwt = null;
    this.signUntil = new Date(0);
    localStorage.removeItem("jwt");
  }

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
