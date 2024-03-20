export interface RedisOptions {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export interface ModulesOptions {
  port: number;
  globalPrefix?: string;
  redis: RedisOptions;
}
