export interface Env {
  environment:
    | "test"
    | "local"
    | "main"
  origin?: string;
  endpoint?: string;
  ws?: string;
}
