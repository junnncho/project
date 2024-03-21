import * as Auth from "./authorization";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class Public implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

@Injectable()
export class None implements CanActivate {
  canActivate(): boolean {
    return false;
  }
}

@Injectable()
export class Every implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp().getRequest();
    // const { user: userId } = gqlCtx.getArgs()["data"];
    const { account } = ctx;
    return Auth.allow(account, ["every"]);
  }
}

@Injectable()
export class Admin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { account } = context.switchToHttp().getRequest();
    return Auth.allow(account, ["admin", "superAdmin"]);
  }
}

@Injectable()
export class SuperAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { account } = context.switchToHttp().getRequest();
    return Auth.allow(account, ["superAdmin"]);
  }
}

@Injectable()
export class User implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { account } = context.switchToHttp().getRequest();
    return Auth.allow(account, ["user"]);
  }
}
