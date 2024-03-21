import { CloudflareOptions } from "../option";
import { CloudflareService } from "./cloudflare.service";
import { DynamicModule, Global, Module } from "@nestjs/common";
import axios from "axios";

@Global()
@Module({})
export class CloudflareModule {
  static register(options: CloudflareOptions): DynamicModule {
    return {
      module: CloudflareModule,
      providers: [
        {
          provide: "CLOUDFLARE_OPTIONS",
          useValue: options,
        },
        {
          provide: "CLOUDFLARE_API",
          useFactory: async () => {
            const api = axios.create({
              baseURL: `https://api.cloudflare.com/client/v4`,
              timeout: 20000,
              headers: {
                "Content-Type": "application/json",
                "X-Auth-Key": options.authKey,
                "X-Auth-Email": options.authEmail,
                Authorization: `Bearer ${options.token}`,
              },
            });
            return api;
          },
        },
        {
          provide: "CLOUDFLARE_TURNSTILE",
          useFactory: async () => {
            const api = axios.create({
              baseURL: `https://challenges.cloudflare.com/turnstile/v0`,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return api;
          },
        },
        CloudflareService,
      ],
      exports: [CloudflareService],
    };
  }
}
