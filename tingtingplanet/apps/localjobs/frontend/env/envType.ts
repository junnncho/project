export interface Env {
  environment:
    | "testing"
    | "testing.local"
    | "debug"
    | "debug.local"
    | "develop"
    | "develop.local"
    | "main"
    | "main.local";
  origin?: string;
  endpoint?: string;
  ws?: string;
  cloudflare: {
    siteKey: string;
  };
}
