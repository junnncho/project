import * as User from "./user.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Global()
@Module({})
export class UserModule {
  static register(isRoot?: boolean) {
    return {
      module: UserModule,
      imports: [MongooseModule.forFeatureAsync([{ name: User.name, useFactory: User.middleware() }])],
      providers: [UserService, UserResolver],
      exports: isRoot ? [UserService] : [UserService],
    };
  }
}
