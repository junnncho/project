import * as User from "./user.model";
import * as gql from "../gql";
import { GetObject, Utils } from "@shared/util";
import { Id, LoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { srv as shared } from "@shared/module";

@Injectable()
export class UserService<
    Mdl extends User.Mdl = User.Mdl,
    Doc extends User.Doc = User.Doc,
    Input extends User.Input = User.Input
  >
  extends LoadService<Mdl, Doc, Input>
  implements GetObject<shared.UserService<Mdl, Doc, Input>>
{
  constructor(
    @InjectModel(User.name) readonly User: Mdl,
    // ================= Library Import Zone ================= //
    private readonly keyringService: shared.KeyringService, // ================= Library Import Zone ================= //
    private readonly fileService: shared.FileService // ================= Library Import Zone ================= //
  ) {
    super(UserService.name, User);
  }
  async addChatBoard(userId: Id, chatBoardId: Id) {
    const user = await this.User.findById(userId);
    await user?.addBoard(chatBoardId).save();
  }

  async resolveImages(userIds: Id[]) {
    const users = await this.loadMany(userIds);
    const images = await Promise.all(users.map((user) => this.fileService.load(user.image)));
    const resolvedUsers = users.map((user, index) => ({
      ...user.toObject(),
      image: images[index],
    }));
    return resolvedUsers;
  }

  async removeChatBoard(userId: Id, chatBoardId: Id) {
    const user = await this.User.findById(userId);
    await user?.removeBoard(chatBoardId).save();
  }

  async getChatBoards(userId: Id) {
    const user = await this.User.findById(userId);
    return user?.chatBoards;
  }

  async summarizeSocial(): Promise<gql.SocialUserSummary> {
    return {
      //
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserService<
  Mdl extends User.Mdl = User.Mdl,
  Doc extends User.Doc = User.Doc,
  Input extends User.Input = User.Input
> extends GetObject<shared.UserService<Mdl, Doc, Input>> {}
Utils.applyMixins(UserService, [shared.UserService]);
