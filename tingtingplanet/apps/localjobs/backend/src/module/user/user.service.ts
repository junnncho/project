import * as User from "./user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Id, LoadService } from "@shared/util-server";

@Injectable()
export class UserService extends LoadService<User.Mdl, User.Doc, User.Input> {
  constructor(
    @InjectModel(User.name)
    private readonly User: User.Mdl
  ) {
    super(UserService.name, User);
  }
  async temp(accountId: Id) {
    console.log("!");
  }
}
