import * as User from "./user.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: User.name, useFactory: User.middleware() }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
