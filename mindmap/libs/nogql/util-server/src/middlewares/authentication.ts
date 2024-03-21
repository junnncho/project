import { Account, verifyToken } from "./authorization";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// export class AuthMiddleware {
//   secret: string;
//   constructor(secret: string) {
//     this.secret = secret;
//     console.log("AuthMiddleware", this.secret);
//   }

export const auth = (secret: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const account = verifyToken(secret, req?.cookies?.accessToken?.jwt);
    req["account"] = account;
    req["geolocation"] = req?.headers?.geolocation;
    req["userAgent"] = req?.headers?.["user-agent"];

    next();
  };
};

// }

export const RequiredAuth = createParamDecorator((data, context: ExecutionContext) => {
  const account: Account | null = context.switchToHttp().getRequest().account;
  if (!account) throw new Error("No or Invalid Account");
  return account;
});

export const Auth = createParamDecorator((data, context: ExecutionContext) => {
  const account: Account | null = context.switchToHttp().getRequest().account;
  return account;
});

export const UserIp = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ip = context.switchToHttp().getRequest().ip;
  return ip;
});

export const Access = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  if (!ctx.geolocation || !ctx.userAgent) throw new Error("No Geolocation or UserAgent");
  return { ...JSON.parse(ctx.geolocation), userAgent: ctx.userAgent, at: new Date(), period: 0 };
});
