export interface EnvironmentOptions {
  srv: 'script' | 'serve' | 'test';
  env:
    | 'testing'
    | 'testing.local'
    | 'debug'
    | 'debug.local'
    | 'develop'
    | 'develop.local'
    | 'main'
    | 'main.local';
  origin: string;
  serves: string[];
}

export interface MongoOptions {
  uri: string;
  dbName: string;
  replSet?: string;
}

export interface TelegramOptions {
  key1: string;
  key2: string;
  channelId: string;
  channel_chatId: number;
  channelUrl: string;
  dashboardUrl: string;
  dashboardId: number;
  period: number;
  close: number;
}

export interface EthereumOptions {
  etherscanKey: string;
  infuraWsUrl: string;
  network: string;
}

export interface SolanaOptions {
  connection: string;
  mainPrivateKey: string;
}

export type ModulesOptions = {
  port: number;
  mongo: MongoOptions;
  telegram: TelegramOptions;
  environment: EnvironmentOptions;
  ethereum: EthereumOptions;
  solana: SolanaOptions;
};
