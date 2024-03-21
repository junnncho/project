import { option as nogql } from '@nogql/module';

export interface EnvironmentOptions {
  srv: 'script' | 'serve' | 'test';
  env: 'testing' | 'testing.local' | 'debug' | 'debug.local' | 'develop' | 'develop.local' | 'main' | 'main.local';
  origin: string;
  serves: string[];
}

export interface MongoOptions {
  uri: string;
  dbName: string;
  replSet?: string;
}

export interface SolanaOptions {
  connection: string;
  mainPrivateKey: string;
}

export type ModulesOptions = nogql.ModulesOptions & {
  solana: SolanaOptions;
};
