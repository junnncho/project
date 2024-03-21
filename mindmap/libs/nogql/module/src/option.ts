export interface Wallet {
  address: string;
  privateKey: string;
}

export interface EnvironmentOptions {
  srv: "script" | "serve" | "test";
  env: "testing" | "testing.local" | "debug" | "debug.local" | "develop" | "develop.local" | "main" | "main.local";
  origin: string;
  serves: string[];
}

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
export const ssoTypes = ["github", "google", "facebook", "apple", "naver", "kakao"] as const;
export type SSOType = (typeof ssoTypes)[number];
export type SSOCredential = {
  clientID: string;
  clientSecret?: string; //apple의 경우 keypath
  callbackURL: string;
};
export type AppleCredential = SSOCredential & {
  teamID: string;
  keyID: string;
  keyFilePath: string;
};
export type SSOOptions = {
  [key in SSOType]?: SSOCredential | AppleCredential;
};
export interface SecurityOptions {
  aeskey: string;
  saltRounds: number;
  jwtSecret: string;
  verifies: ("wallet" | "password" | "phone" | "kakao" | "naver" | "email")[][];
  sso: SSOOptions;
}
export interface MongoOptions {
  uri: string;
  dbName: string;
  replSet?: string;
}

export interface ModulesOptions {
  port: number;
  globalPrefix?: string;
  environment: EnvironmentOptions;
  security: SecurityOptions;
  mongo: MongoOptions;
  objectStorage: ObjectStorageOptions;
  mailer: MailerOptions;
  message: MessageOptions;
  cloudflare: CloudflareOptions;
}
