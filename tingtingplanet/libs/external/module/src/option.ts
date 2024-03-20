import { DiscordToken, ModulesOptions as SharedOptions } from "@shared/util-server";

export interface ObjectStorageOptions {
  service: "s3" | "minio" | "r2";
  region: string;
  accessKey: string;
  secretAccessKey: string;
  distributionId: string;
  bucket: string;
  root: string;
  host: string | null;
}
export interface IpfsOptions {
  endpoint: string;
}

export interface DiscordOptions {
  tokens: DiscordToken[];
  webhook: string;
}
export interface MailerOptions {
  address: string;
  service: "gmail";
  auth: {
    user: string;
    pass: string;
  };
}
export interface MessageOptions {
  phone: string;
  apiKey: string;
  apiSecret: string;
}
export interface CloudflareOptions {
  authEmail: string;
  authKey: string;
  token: string;
  accountId: string;
  turnstileSecret: string;
}
export interface ModulesOptions extends SharedOptions {
  objectStorage: ObjectStorageOptions;
  ipfs: IpfsOptions;
  discord: DiscordOptions;
  mailer: MailerOptions;
  message: MessageOptions;
  cloudflare: CloudflareOptions;
}

